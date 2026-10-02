(() => {
  'use strict';

  const BANK_FILE = document.body.dataset.bankFile;

  let BANK = [];
  let EXAMS = {};
  let byId = {};

  let state = {
    examKey: null,
    ids: [],
    answers: {},
    current: 0,
    seconds: 3600,
    timerId: null,
    submitted: false
  };

  function handleSimulationSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    const q = input.value.trim().toLocaleLowerCase('pt-PT');
    const home = document.getElementById('home');

    if (home && !home.classList.contains('hidden')) {
      document.querySelectorAll('#home .exam-card').forEach(card => {
        const match =
          !q || card.textContent.toLocaleLowerCase('pt-PT').includes(q);

        card.style.display = match ? '' : 'none';
      });
    }
  }

  function clearSimulationSearch() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';

    document.querySelectorAll('#home .exam-card').forEach(card => {
      card.style.display = '';
    });

    document.getElementById('search-box')?.classList.add('hidden');
  }

  async function initSimulator() {
    try {
      if (!BANK_FILE) {
        throw new Error('Falta data-bank-file no elemento <body>.');
      }

      const res = await fetch(BANK_FILE, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error(`Falha ao carregar o banco de questões: HTTP ${res.status}`);
      }

      const data = await res.json();

      BANK = data.questions || [];
      EXAMS = data.exams || {};
      byId = Object.fromEntries(BANK.map(q => [q.id, q]));

      if (!BANK.length || !EXAMS.exam1 || !EXAMS.exam2) {
        throw new Error('O ficheiro JSON não contém a estrutura esperada.');
      }

      document.getElementById('loading').classList.add('hidden');
      document.getElementById('home').classList.remove('hidden');
    } catch (err) {
      const el = document.getElementById('loading');

      if (el) {
        el.className = 'error';
        el.textContent =
          `Não foi possível carregar as questões. Confirma que “${BANK_FILE || 'banco de questões'}” está acessível e que a app está a ser aberta por HTTP/HTTPS.`;
      }

      console.error(err);
    }
  }

  function startExam(examKey) {
    clearInterval(state.timerId);

    state = {
      examKey,
      ids: [...EXAMS[examKey]],
      answers: {},
      current: 0,
      seconds: 3600,
      timerId: null,
      submitted: false
    };

    document.getElementById('home').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('exam').classList.remove('hidden');

    document.getElementById('examLabel').textContent =
      examKey === 'exam1' ? 'Exame de Estudo 1' : 'Exame de Estudo 2';

    renderQuestion();
    renderNav();
    updateStatus();
    updateTimer();

    state.timerId = setInterval(() => {
      state.seconds -= 1;
      updateTimer();

      if (state.seconds <= 0) {
        submitExam(true);
      }
    }, 1000);

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderQuestion() {
    const id = state.ids[state.current];
    const q = byId[id];

    if (!q) return;

    document.getElementById('qCount').textContent =
      `Questão ${state.current + 1} de ${state.ids.length}`;

    document.getElementById('qTopic').textContent = q.topic || '';
    document.getElementById('qText').textContent = q.question;

    const options = document.getElementById('options');

    options.innerHTML = q.options.map((text, i) => {
      const selected = state.answers[state.current] === i;

      return `
        <label class="option ${selected ? 'selected' : ''}">
          <input
            type="radio"
            name="currentQuestion"
            value="${i}"
            ${selected ? 'checked' : ''}
            onchange="setAnswer(${i})"
          >
          <span class="option-letter">${'ABCD'[i] || (i + 1)}</span>
          <span class="option-text">${escapeHtml(text)}</span>
        </label>
      `;
    }).join('');

    const prevBtn = document.getElementById('prevBtn');
    prevBtn.disabled = state.current === 0;
    prevBtn.style.opacity = state.current === 0 ? '.45' : '1';

    document.getElementById('nextBtn').textContent =
      state.current === state.ids.length - 1 ? 'Rever' : 'Seguinte';

    renderNav();
  }

  function setAnswer(optionIndex) {
    state.answers[state.current] = optionIndex;
    renderQuestion();
    updateStatus();
  }

  function goPrev() {
    if (state.current > 0) {
      state.current -= 1;
      renderQuestion();
      scrollExamTop();
    }
  }

  function goNext() {
    if (state.current < state.ids.length - 1) {
      state.current += 1;
      renderQuestion();
      scrollExamTop();
      return;
    }

    const firstMissing = state.ids.findIndex(
      (_, i) => state.answers[i] === undefined
    );

    if (firstMissing >= 0) {
      state.current = firstMissing;
      renderQuestion();
      scrollExamTop();
    }
  }

  function goToQuestion(index) {
    state.current = index;
    renderQuestion();
    scrollExamTop();
  }

  function scrollExamTop() {
    const exam = document.getElementById('exam');
    if (!exam) return;

    const shellOffset =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--study-shell-offset')
      ) || 124;

    const y =
      exam.getBoundingClientRect().top +
      window.scrollY -
      shellOffset -
      8;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: 'smooth'
    });
  }

  function renderNav() {
    const nav = document.getElementById('qnav');

    nav.innerHTML = state.ids.map((_, i) => {
      const done = state.answers[i] !== undefined;
      const current = i === state.current;

      return `
        <button
          class="${done ? 'done' : ''} ${current ? 'current' : ''}"
          onclick="goToQuestion(${i})"
        >
          ${i + 1}
        </button>
      `;
    }).join('');

    requestAnimationFrame(() => {
      const current = nav.children[state.current];

      if (current) {
        current.scrollIntoView({
          block: 'nearest',
          inline: 'center'
        });
      }
    });
  }

  function updateStatus() {
    const answered = Object.keys(state.answers).length;

    document.getElementById('answeredLabel').textContent =
      `${answered}/${state.ids.length} respondidas`;

    document.getElementById('progressBar').style.width =
      `${(answered / state.ids.length) * 100}%`;
  }

  function updateTimer() {
    const timer = document.getElementById('timer');
    const seconds = Math.max(0, state.seconds);
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;

    timer.textContent =
      `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;

    timer.classList.toggle('low', seconds <= 300);
  }

  function submitExam(auto) {
    if (state.submitted) return;

    const missingIndexes = state.ids
      .map((_, i) => state.answers[i] === undefined ? i + 1 : null)
      .filter(Boolean);

    if (!auto && missingIndexes.length) {
      const shown = missingIndexes.slice(0, 12).join(', ');
      const more =
        missingIndexes.length > 12
          ? ` e mais ${missingIndexes.length - 12}`
          : '';

      const ok = confirm(
        `Tens ${missingIndexes.length} pergunta(s) por responder: ${shown}${more}.\n\nQueres submeter a simulação na mesma?`
      );

      if (!ok) {
        state.current = missingIndexes[0] - 1;
        renderQuestion();
        scrollExamTop();
        return;
      }
    } else if (!auto) {
      if (!confirm('Confirmas a submissão da simulação?')) {
        return;
      }
    }

    state.submitted = true;
    clearInterval(state.timerId);
    showResult(auto);
  }

  function showResult(auto) {
    let correct = 0;
    const reviews = [];

    state.ids.forEach((id, i) => {
      const q = byId[id];
      const answer = state.answers[i];

      if (answer === q.answer) {
        correct += 1;
      }

      reviews.push({ q, answer, index: i });
    });

    const total = state.ids.length;
    const score = Math.round(((correct / total) * 20) * 10) / 10;
    const percent = Math.round((correct / total) * 1000) / 10;
    const pass = score >= 9.5;
    const unanswered = total - Object.keys(state.answers).length;

    document.getElementById('exam').classList.add('hidden');

    const result = document.getElementById('result');
    result.classList.remove('hidden');

    result.innerHTML = `
      <div class="result-card">
        <span class="pill">Resultado final</span>

        <div class="score ${pass ? 'pass' : 'fail'}">
          ${score.toFixed(1)} / 20
        </div>

        <p>
          <b>${pass ? 'Aprovado' : 'Não aprovado'}</b>
          ${
            pass
              ? ' · classificação igual ou superior a 9,5 valores.'
              : ' · classificação inferior a 9,5 valores.'
          }
        </p>

        ${
          auto
            ? '<div class="notice">O tempo terminou e a simulação foi submetida automaticamente.</div>'
            : ''
        }

        <div class="result-stats">
          <div class="result-stat">
            <b>${correct}/${total}</b>
            <span>Corretas</span>
          </div>
          <div class="result-stat">
            <b>${percent.toFixed(1)}%</b>
            <span>Percentagem</span>
          </div>
          <div class="result-stat">
            <b>${unanswered}</b>
            <span>Em branco</span>
          </div>
        </div>

        <div class="controls">
          <button class="secondary" onclick="goHome()">Menu</button>
          <button class="primary" style="margin-top:0" onclick="startExam(window.simulatorState.examKey)">
            Repetir
          </button>
        </div>
      </div>

      <div class="review-title">Correção detalhada</div>
      ${reviews.map(reviewHtml).join('')}
    `;

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function reviewHtml(item) {
    const { q, answer, index } = item;
    const ok = answer === q.answer;

    const chosen =
      answer === undefined
        ? 'Sem resposta'
        : q.options[answer];

    return `
      <article class="review ${ok ? 'correct' : 'incorrect'}">
        <div class="small">
          Questão ${index + 1} · ${escapeHtml(q.topic || '')}
        </div>

        <h3>${escapeHtml(q.question)}</h3>

        <p>
          Tua resposta:
          <span class="answer">${escapeHtml(chosen)}</span>
        </p>

        <p>
          Resposta correta:
          <span class="answer">${escapeHtml(q.options[q.answer])}</span>
        </p>

        ${q.explanation ? `<p>${escapeHtml(q.explanation)}</p>` : ''}
      </article>
    `;
  }

  function goHome() {
    clearInterval(state.timerId);
    state.submitted = true;

    document.getElementById('result').classList.add('hidden');
    document.getElementById('exam').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  window.addEventListener('beforeunload', event => {
    const exam = document.getElementById('exam');
    const examVisible =
      exam && !exam.classList.contains('hidden');

    if (examVisible && !state.submitted) {
      event.preventDefault();
      event.returnValue = '';
    }
  });

  Object.assign(window, {
    handleSimulationSearch,
    clearSimulationSearch,
    startExam,
    setAnswer,
    goPrev,
    goNext,
    goToQuestion,
    submitExam,
    goHome
  });

  Object.defineProperty(window, 'simulatorState', {
    get() {
      return state;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator, { once: true });
  } else {
    initSimulator();
  }
})();
