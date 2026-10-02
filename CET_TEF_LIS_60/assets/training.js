(() => {
  'use strict';

  let BANK = [];
  let TOPICS = [];
  let sessionQuestions = [];
  let currentIndex = 0;
  let selectedIndex = null;
  let answered = false;
  let correctCount = 0;
  let wrongCount = 0;
  let sessionLabel = '';

  const body = document.body;
  const BANK_FILE = body.dataset.bankFile;
  const STORAGE_PREFIX = body.dataset.storagePrefix;

  if (!BANK_FILE || !STORAGE_PREFIX) {
    console.error('Treino Ativo: faltam data-bank-file ou data-storage-prefix no <body>.');
  }

  const ERROR_KEY = `${STORAGE_PREFIX}_active_recall_errors`;
  const LAST_KEY = `${STORAGE_PREFIX}_active_recall_last`;

  function clearSearch() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';

    document.querySelectorAll('.topic-chip').forEach(el => el.classList.remove('hidden'));
    document.getElementById('search-box')?.classList.add('hidden');
  }

  function applySearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    const q = input.value.trim().toLocaleLowerCase('pt-PT');

    document.querySelectorAll('.topic-chip').forEach(el => {
      el.classList.toggle(
        'hidden',
        Boolean(q) && !el.textContent.toLocaleLowerCase('pt-PT').includes(q)
      );
    });
  }

  function getErrorIds() {
    try {
      return JSON.parse(localStorage.getItem(ERROR_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function setErrorIds(ids) {
    localStorage.setItem(ERROR_KEY, JSON.stringify([...new Set(ids)]));
  }

  function addError(id) {
    const ids = getErrorIds();
    if (!ids.includes(id)) ids.push(id);
    setErrorIds(ids);
  }

  function removeError(id) {
    setErrorIds(getErrorIds().filter(x => x !== id));
  }

  function shuffle(arr) {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  async function initTraining() {
    try {
      const res = await fetch(BANK_FILE, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      BANK = data.questions || [];
      TOPICS = [...new Set(BANK.map(q => q.topic))];

      document.getElementById('bankCount').textContent = BANK.length;
      renderTopics();
      refreshStats();

      document.getElementById('loading').classList.add('hidden');
      document.getElementById('setup').classList.remove('hidden');
    } catch (err) {
      console.error(err);
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('errorBox').classList.remove('hidden');
    }
  }

  function renderTopics() {
    const box = document.getElementById('topicList');
    if (!box) return;

    box.innerHTML = TOPICS.map((topic, idx) => {
      const count = BANK.filter(q => q.topic === topic).length;

      return `<button class="topic-chip touch-active" onclick="startTopic(${idx})">
        <div>${escapeHtml(topic)}</div>
        <div class="text-[9px] opacity-70 mt-1">${count} perguntas</div>
      </button>`;
    }).join('');
  }

  function refreshStats() {
    const errors = getErrorIds();

    document.getElementById('errorCount').textContent = errors.length;
    document.getElementById('reviewErrorsBtn').disabled = errors.length === 0;

    try {
      const last = JSON.parse(localStorage.getItem(LAST_KEY) || 'null');
      document.getElementById('bestRate').textContent = last ? `${last.rate}%` : '—';
    } catch {
      document.getElementById('bestRate').textContent = '—';
    }
  }

  function startRandom(n) {
    beginSession(shuffle(BANK).slice(0, n), `${n} perguntas aleatórias`);
  }

  function startTopic(idx) {
    const topic = TOPICS[idx];
    beginSession(shuffle(BANK.filter(q => q.topic === topic)), topic);
  }

  function startErrors() {
    const ids = getErrorIds();
    const questions = shuffle(BANK.filter(q => ids.includes(q.id)));

    if (!questions.length) {
      alert('Não tens perguntas guardadas para revisão.');
      return;
    }

    beginSession(questions, 'Revisão de erros');
  }

  function beginSession(questions, label) {
    if (!questions.length) return;

    sessionQuestions = questions;
    currentIndex = 0;
    selectedIndex = null;
    answered = false;
    correctCount = 0;
    wrongCount = 0;
    sessionLabel = label;

    document.getElementById('setup').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('session').classList.remove('hidden');

    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderQuestion() {
    const q = sessionQuestions[currentIndex];
    selectedIndex = null;
    answered = false;

    document.getElementById('sessionLabel').textContent = sessionLabel;
    document.getElementById('questionIndex').textContent =
      `Pergunta ${currentIndex + 1} de ${sessionQuestions.length}`;
    document.getElementById('questionTopic').textContent = q.topic || '';
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('scoreNow').textContent = `${correctCount} certas`;
    document.getElementById('sessionStats').textContent =
      `${currentIndex + 1}/${sessionQuestions.length} · ${correctCount} corretas`;
    document.getElementById('progressFill').style.width =
      `${(currentIndex / sessionQuestions.length) * 100}%`;

    const opts = document.getElementById('options');
    opts.innerHTML = q.options.map((opt, idx) => `
      <button class="option text-left" data-idx="${idx}" onclick="selectOption(${idx})">
        <span class="letter">${String.fromCharCode(65 + idx)}</span>
        <span>${escapeHtml(opt)}</span>
      </button>
    `).join('');

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.disabled = true;
    confirmBtn.classList.remove('hidden');

    document.getElementById('nextBtn').classList.add('hidden');

    const feedback = document.getElementById('feedback');
    feedback.classList.add('hidden');
    feedback.innerHTML = '';
  }

  function selectOption(idx) {
    if (answered) return;

    selectedIndex = idx;

    document.querySelectorAll('.option').forEach((el, i) => {
      el.classList.toggle('selected', i === idx);
    });

    document.getElementById('confirmBtn').disabled = false;
  }

  function confirmAnswer() {
    if (answered || selectedIndex === null) return;

    answered = true;

    const q = sessionQuestions[currentIndex];
    const isCorrect = selectedIndex === q.answer;

    if (isCorrect) {
      correctCount++;
      removeError(q.id);
    } else {
      wrongCount++;
      addError(q.id);
    }

    document.querySelectorAll('.option').forEach((el, i) => {
      el.classList.remove('selected');
      if (i === q.answer) el.classList.add('correct');
      if (i === selectedIndex && !isCorrect) el.classList.add('wrong');
    });

    const feedback = document.getElementById('feedback');
    feedback.className = isCorrect
      ? 'mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4'
      : 'mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4';

    feedback.innerHTML = `
      <div class="text-xs font-black ${
        isCorrect
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-rose-600 dark:text-rose-400'
      }">
        ${isCorrect ? 'Correto' : 'Incorreto'}
      </div>

      <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
        ${escapeHtml(q.explanation || '')}
      </div>

      <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
        Resposta correta:
        <strong>${String.fromCharCode(65 + q.answer)}. ${escapeHtml(q.options[q.answer])}</strong>
      </div>
    `;

    document.getElementById('confirmBtn').classList.add('hidden');

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.classList.remove('hidden');
    nextBtn.textContent =
      currentIndex === sessionQuestions.length - 1
        ? 'Ver resultado'
        : 'Próxima pergunta';

    document.getElementById('scoreNow').textContent = `${correctCount} certas`;
    refreshStats();
  }

  function nextQuestion() {
    if (!answered) return;

    if (currentIndex < sessionQuestions.length - 1) {
      currentIndex++;
      renderQuestion();

      const session = document.getElementById('session');
      const offset = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--study-shell-offset')
      ) || 124;

      window.scrollTo({
        top: Math.max(0, session.offsetTop - offset - 8),
        behavior: 'smooth'
      });
    } else {
      finishSession();
    }
  }

  function finishSession() {
    const total = sessionQuestions.length;
    const rate = Math.round((correctCount / total) * 100);

    localStorage.setItem(
      LAST_KEY,
      JSON.stringify({
        rate,
        total,
        correct: correctCount,
        date: Date.now()
      })
    );

    document.getElementById('session').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');

    document.getElementById('resultScore').textContent = `${rate}%`;
    document.getElementById('resultText').textContent =
      rate >= 80
        ? 'Bom domínio nesta sessão. Revê apenas os erros para consolidar.'
        : rate >= 60
          ? 'Domínio parcial. Vale a pena repetir os temas em que falhaste.'
          : 'Ainda há conceitos frágeis. Volta ao resumo e depois revê os erros.';

    document.getElementById('resultCorrect').textContent = correctCount;
    document.getElementById('resultWrong').textContent = wrongCount;
    document.getElementById('resultReview').textContent = getErrorIds().length;

    refreshStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function exitSession() {
    if (confirm('Sair deste treino? O progresso desta sessão não será guardado como resultado final.')) {
      backToSetup();
    }
  }

  function backToSetup() {
    document.getElementById('session').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('setup').classList.remove('hidden');

    refreshStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetProgress() {
    if (!confirm('Limpar todas as perguntas guardadas para revisão e o último resultado?')) {
      return;
    }

    localStorage.removeItem(ERROR_KEY);
    localStorage.removeItem(LAST_KEY);
    refreshStats();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  // Functions referenced by inline HTML controls.
  Object.assign(window, {
    clearSearch,
    applySearch,
    startRandom,
    startTopic,
    startErrors,
    selectOption,
    confirmAnswer,
    nextQuestion,
    exitSession,
    backToSetup,
    resetProgress
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTraining, { once: true });
  } else {
    initTraining();
  }
})();
