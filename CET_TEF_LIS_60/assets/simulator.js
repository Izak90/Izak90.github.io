(() => {
  'use strict';

  const BANK_FILE_EASY = document.body.dataset.bankFile;
  const BANK_FILE_HARD = document.body.dataset.bankFileHard || null;
  const BANKS = {};
  let activeDifficulty = 'easy';

  let state = {
    difficulty: 'easy',
    examKey: null,
    ids: [],
    answers: {},
    current: 0,
    seconds: 3600,
    timerId: null,
    submitted: false
  };

  function getActiveBank() {
    return BANKS[activeDifficulty] || BANKS.easy;
  }

  function handleSimulationSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    const q = input.value.trim().toLocaleLowerCase('pt-PT');

    if (!document.getElementById('home')?.classList.contains('hidden')) {
      document.querySelectorAll('#home .exam-card').forEach(card => {
        card.style.display = (!q || card.textContent.toLocaleLowerCase('pt-PT').includes(q)) ? '' : 'none';
      });
    }
  }

  function clearSimulationSearch() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    document.querySelectorAll('#home .exam-card').forEach(card => card.style.display = '');
    document.getElementById('search-box')?.classList.add('hidden');
  }

  async function loadBank(file, difficulty) {
    const res = await fetch(file, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${difficulty}: HTTP ${res.status}`);
    const data = await res.json();
    if (!(data.questions || []).length || !data.exams?.exam1 || !data.exams?.exam2) {
      throw new Error(`${difficulty}: estrutura JSON inválida`);
    }
    BANKS[difficulty] = {
      questions: data.questions,
      exams: data.exams,
      byId: Object.fromEntries(data.questions.map(q => [q.id, q])),
      meta: data
    };
  }

  async function initSimulator() {
    try {
      if (!BANK_FILE_EASY) throw new Error('Falta data-bank-file');
      const jobs = [loadBank(BANK_FILE_EASY, 'easy')];
      if (BANK_FILE_HARD) jobs.push(loadBank(BANK_FILE_HARD, 'hard'));
      await Promise.all(jobs);
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('home').classList.remove('hidden');
    } catch (err) {
      console.error(err);
      const el = document.getElementById('loading');
      el.className = 'error';
      el.textContent = 'Não foi possível carregar o(s) banco(s) de questões. Confirma os JSON e que a app está aberta por HTTP/HTTPS.';
    }
  }

  function startExam(difficultyOrExamKey, maybeExamKey) {
    let difficulty = 'easy';
    let examKey = difficultyOrExamKey;

    // Compatibilidade com outras UCs: startExam('exam1')
    if (maybeExamKey) {
      difficulty = difficultyOrExamKey;
      examKey = maybeExamKey;
    }

    if (!BANKS[difficulty]) {
      alert('O banco selecionado não está disponível.');
      return;
    }

    activeDifficulty = difficulty;
    const bank = getActiveBank();

    clearInterval(state.timerId);
    state = {
      difficulty,
      examKey,
      ids: [...bank.exams[examKey]],
      answers: {},
      current: 0,
      seconds: 3600,
      timerId: null,
      submitted: false
    };

    document.getElementById('home').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('exam').classList.remove('hidden');

    const diff = difficulty === 'hard' ? 'Difícil' : 'Fácil';
    document.getElementById('examLabel').textContent = `Exame ${diff} ${examKey === 'exam1' ? '1' : '2'}`;

    renderQuestion();
    renderNav();
    updateStatus();
    updateTimer();

    state.timerId = setInterval(() => {
      state.seconds -= 1;
      updateTimer();
      if (state.seconds <= 0) submitExam(true);
    }, 1000);

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderQuestion() {
    const q = getActiveBank().byId[state.ids[state.current]];
    if (!q) return;

    document.getElementById('qCount').textContent = `Questão ${state.current + 1} de ${state.ids.length}`;
    document.getElementById('qTopic').textContent = q.topic || '';
    document.getElementById('qText').textContent = q.question;
    document.getElementById('options').innerHTML = q.options.map((txt, i) => {
      const selected = state.answers[state.current] === i;
      return `<label class="option ${selected ? 'selected' : ''}">
        <input type="radio" name="currentQuestion" value="${i}" ${selected ? 'checked' : ''} onchange="setAnswer(${i})">
        <span class="option-letter">${'ABCD'[i] || i + 1}</span>
        <span class="option-text">${escapeHtml(txt)}</span>
      </label>`;
    }).join('');

    document.getElementById('prevBtn').disabled = state.current === 0;
    document.getElementById('prevBtn').style.opacity = state.current === 0 ? '.45' : '1';
    document.getElementById('nextBtn').textContent = state.current === state.ids.length - 1 ? 'Rever' : 'Seguinte';
    renderNav();
  }

  function setAnswer(i) {
    state.answers[state.current] = i;
    renderQuestion();
    updateStatus();
  }

  function goPrev() {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
      scrollExamTop();
    }
  }

  function goNext() {
    if (state.current < state.ids.length - 1) {
      state.current++;
      renderQuestion();
      scrollExamTop();
      return;
    }
    const missing = state.ids.findIndex((_, i) => state.answers[i] === undefined);
    if (missing >= 0) {
      state.current = missing;
      renderQuestion();
      scrollExamTop();
    }
  }

  function goToQuestion(i) {
    state.current = i;
    renderQuestion();
    scrollExamTop();
  }

  function scrollExamTop() {
    const exam = document.getElementById('exam');
    if (!exam) return;
    const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--study-shell-offset')) || 124;
    const y = exam.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function renderNav() {
    const nav = document.getElementById('qnav');
    nav.innerHTML = state.ids.map((_, i) =>
      `<button class="${state.answers[i] !== undefined ? 'done' : ''} ${i === state.current ? 'current' : ''}" onclick="goToQuestion(${i})">${i + 1}</button>`
    ).join('');
    requestAnimationFrame(() => nav.children[state.current]?.scrollIntoView({ block:'nearest', inline:'center' }));
  }

  function updateStatus() {
    const answered = Object.keys(state.answers).length;
    document.getElementById('answeredLabel').textContent = `${answered}/${state.ids.length} respondidas`;
    document.getElementById('progressBar').style.width = `${answered / state.ids.length * 100}%`;
  }

  function updateTimer() {
    const t = document.getElementById('timer');
    const s = Math.max(0, state.seconds);
    t.textContent = `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
    t.classList.toggle('low', s <= 300);
  }

  function submitExam(auto) {
    if (state.submitted) return;
    const missing = state.ids.map((_,i) => state.answers[i] === undefined ? i + 1 : null).filter(Boolean);

    if (!auto && missing.length) {
      const shown = missing.slice(0,12).join(', ');
      const more = missing.length > 12 ? ` e mais ${missing.length - 12}` : '';
      if (!confirm(`Tens ${missing.length} pergunta(s) por responder: ${shown}${more}.\n\nQueres submeter na mesma?`)) {
        state.current = missing[0] - 1;
        renderQuestion();
        scrollExamTop();
        return;
      }
    } else if (!auto && !confirm('Confirmas a submissão da simulação?')) {
      return;
    }

    state.submitted = true;
    clearInterval(state.timerId);
    showResult(auto);
  }

  function showResult(auto) {
    const bank = getActiveBank();
    let correct = 0;
    const reviews = [];

    state.ids.forEach((id, i) => {
      const q = bank.byId[id];
      const answer = state.answers[i];
      if (answer === q.answer) correct++;
      reviews.push({q, answer, index:i});
    });

    const total = state.ids.length;
    const score = Math.round((correct / total * 20) * 10) / 10;
    const percent = Math.round(correct / total * 1000) / 10;
    const pass = score >= 9.5;
    const unanswered = total - Object.keys(state.answers).length;
    const diff = state.difficulty === 'hard' ? 'Difícil' : 'Fácil';

    document.getElementById('exam').classList.add('hidden');
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    result.innerHTML = `
      <div class="result-card">
        <span class="pill">Exame ${diff}</span>
        <div class="score ${pass ? 'pass' : 'fail'}">${score.toFixed(1)} / 20</div>
        <p><b>${pass ? 'Aprovado' : 'Não aprovado'}</b>${pass ? ' · classificação igual ou superior a 9,5 valores.' : ' · classificação inferior a 9,5 valores.'}</p>
        ${auto ? '<div class="notice">O tempo terminou e a simulação foi submetida automaticamente.</div>' : ''}
        <div class="result-stats">
          <div class="result-stat"><b>${correct}/${total}</b><span>Corretas</span></div>
          <div class="result-stat"><b>${percent.toFixed(1)}%</b><span>Percentagem</span></div>
          <div class="result-stat"><b>${unanswered}</b><span>Em branco</span></div>
        </div>
        <div class="controls">
          <button class="secondary" onclick="goHome()">Menu</button>
          <button class="primary" style="margin-top:0" onclick="startExam(window.simulatorState.difficulty, window.simulatorState.examKey)">Repetir</button>
        </div>
      </div>
      <div class="review-title">Correção detalhada</div>
      ${reviews.map(reviewHtml).join('')}`;
    window.scrollTo({top:0, behavior:'auto'});
  }

  function reviewHtml({q, answer, index}) {
    const ok = answer === q.answer;
    const chosen = answer === undefined ? 'Sem resposta' : q.options[answer];
    return `<article class="review ${ok ? 'correct' : 'incorrect'}">
      <div class="small">Questão ${index + 1} · ${escapeHtml(q.topic || '')}</div>
      <h3>${escapeHtml(q.question)}</h3>
      <p>Tua resposta: <span class="answer">${escapeHtml(chosen)}</span></p>
      <p>Resposta correta: <span class="answer">${escapeHtml(q.options[q.answer])}</span></p>
      ${q.explanation ? `<p>${escapeHtml(q.explanation)}</p>` : ''}
    </article>`;
  }

  function goHome() {
    clearInterval(state.timerId);
    state.submitted = true;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('exam').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    window.scrollTo({top:0, behavior:'auto'});
  }

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  window.addEventListener('beforeunload', e => {
    const exam = document.getElementById('exam');
    if (exam && !exam.classList.contains('hidden') && !state.submitted) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  Object.assign(window, {
    handleSimulationSearch, clearSimulationSearch, startExam, setAnswer,
    goPrev, goNext, goToQuestion, submitExam, goHome
  });
  Object.defineProperty(window, 'simulatorState', {get: () => state});

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator, {once:true});
  } else {
    initSimulator();
  }
})();
