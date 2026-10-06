(() => {
  'use strict';

  const body = document.body;
  const BANK_FILE_EASY = body.dataset.bankFile;
  const BANK_FILE_MEDIUM = body.dataset.bankFileMedium || null;
  const BANK_FILE_HARD = body.dataset.bankFileHard || null;
  const STORAGE_PREFIX = body.dataset.storagePrefix;

  const BANKS = {};
  let activeDifficulty = 'easy';
  let BANK = [];
  let TOPICS = [];
  let sessionQuestions = [];
  let currentIndex = 0;
  let selectedIndex = null;
  let answered = false;
  let correctCount = 0;
  let wrongCount = 0;
  let sessionLabel = '';

  const diffName = () => activeDifficulty === 'hard' ? 'Difícil' : activeDifficulty === 'medium' ? 'Médio' : 'Fácil';
  const errorKey = () => `${STORAGE_PREFIX}_${activeDifficulty}_active_recall_errors`;
  const lastKey = () => `${STORAGE_PREFIX}_${activeDifficulty}_active_recall_last`;

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
      el.classList.toggle('hidden', Boolean(q) && !el.textContent.toLocaleLowerCase('pt-PT').includes(q));
    });
  }

  function getErrorIds() {
    try { return JSON.parse(localStorage.getItem(errorKey()) || '[]'); }
    catch { return []; }
  }

  function setErrorIds(ids) {
    localStorage.setItem(errorKey(), JSON.stringify([...new Set(ids)]));
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

  async function loadBank(file, difficulty) {
    const res = await fetch(file, {cache:'no-store'});
    if (!res.ok) throw new Error(`${difficulty}: HTTP ${res.status}`);
    const data = await res.json();
    if (!(data.questions || []).length) throw new Error(`${difficulty}: banco vazio`);
    BANKS[difficulty] = data.questions;
  }

  async function initTraining() {
    try {
      if (!BANK_FILE_EASY || !STORAGE_PREFIX) throw new Error('Configuração incompleta');
      const jobs = [loadBank(BANK_FILE_EASY, 'easy')];
      if (BANK_FILE_MEDIUM) jobs.push(loadBank(BANK_FILE_MEDIUM, 'medium'));
      if (BANK_FILE_HARD) jobs.push(loadBank(BANK_FILE_HARD, 'hard'));
      await Promise.all(jobs);
      setTrainingDifficulty('easy', false);
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('setup').classList.remove('hidden');
    } catch (err) {
      console.error(err);
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('errorBox').classList.remove('hidden');
    }
  }

  function setTrainingDifficulty(difficulty, scroll = true) {
    if (!BANKS[difficulty]) {
      if (difficulty === 'hard') alert('O banco difícil não está disponível nesta UC.');
      return;
    }

    activeDifficulty = difficulty;
    BANK = BANKS[difficulty];
    TOPICS = [...new Set(BANK.map(q => q.topic))];

    document.getElementById('bankCount').textContent = BANK.length;
    document.getElementById('difficultyBankCount')?.replaceChildren(document.createTextNode(`${BANK.length} perguntas`));

    const desc = document.getElementById('difficultyDescription');
    if (desc) desc.textContent = difficulty === 'hard'
      ? 'Banco difícil · resposta mais correta, casos práticos e armadilhas conceptuais.'
      : difficulty === 'medium'
        ? 'Banco médio · opções semelhantes, valores próximos e maior interpretação.'
        : 'Banco fácil · consolidação e revisão direta.';

    const easy = document.getElementById('difficultyEasyBtn');
    const medium = document.getElementById('difficultyMediumBtn');
    const hard = document.getElementById('difficultyHardBtn');
    if (easy && medium && hard) {
      easy.className = difficulty === 'easy'
        ? 'p-3 rounded-2xl border border-blue-500 bg-blue-600 text-white text-left touch-active'
        : 'p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-left touch-active';
      medium.className = difficulty === 'medium'
        ? 'p-3 rounded-2xl border border-sky-500 bg-sky-500 text-slate-950 text-left touch-active'
        : 'p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-left touch-active';
      hard.className = difficulty === 'hard'
        ? 'p-3 rounded-2xl border border-amber-500 bg-amber-500 text-slate-950 text-left touch-active'
        : 'p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-left touch-active';
    }

    renderTopics();
    refreshStats();
    if (scroll) document.getElementById('setup')?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function renderTopics() {
    const box = document.getElementById('topicList');
    if (!box) return;
    box.innerHTML = TOPICS.map((topic, idx) => {
      const count = BANK.filter(q => q.topic === topic).length;
      return `<button class="topic-chip touch-active" onclick="startTopic(${idx})">
        <div>${escapeHtml(topic)}</div>
        <div class="text-[9px] opacity-70 mt-1">${count} perguntas · ${diffName()}</div>
      </button>`;
    }).join('');
  }

  function refreshStats() {
    const errors = getErrorIds();
    document.getElementById('errorCount').textContent = errors.length;
    document.getElementById('reviewErrorsBtn').disabled = errors.length === 0;
    try {
      const last = JSON.parse(localStorage.getItem(lastKey()) || 'null');
      document.getElementById('bestRate').textContent = last ? `${last.rate}%` : '—';
    } catch {
      document.getElementById('bestRate').textContent = '—';
    }
  }

  function startRandom(n) {
    beginSession(shuffle(BANK).slice(0,n), `${diffName()} · ${n} perguntas aleatórias`);
  }

  function startTopic(idx) {
    const topic = TOPICS[idx];
    beginSession(shuffle(BANK.filter(q => q.topic === topic)), `${diffName()} · ${topic}`);
  }

  function startErrors() {
    const ids = getErrorIds();
    const list = shuffle(BANK.filter(q => ids.includes(q.id)));
    if (!list.length) {
      alert(`Não tens perguntas ${diffName().toLowerCase()} guardadas para revisão.`);
      return;
    }
    beginSession(list, `${diffName()} · Revisão de erros`);
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
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function renderQuestion() {
    const q = sessionQuestions[currentIndex];
    selectedIndex = null;
    answered = false;

    document.getElementById('sessionLabel').textContent = sessionLabel;
    document.getElementById('questionIndex').textContent = `Pergunta ${currentIndex + 1} de ${sessionQuestions.length}`;
    document.getElementById('questionTopic').textContent = q.topic || '';
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('scoreNow').textContent = `${correctCount} certas`;
    document.getElementById('sessionStats').textContent = `${currentIndex + 1}/${sessionQuestions.length} · ${correctCount} corretas`;
    document.getElementById('progressFill').style.width = `${currentIndex / sessionQuestions.length * 100}%`;

    document.getElementById('options').innerHTML = q.options.map((opt, idx) => `
      <button class="option text-left" data-idx="${idx}" onclick="selectOption(${idx})">
        <span class="letter">${String.fromCharCode(65+idx)}</span>
        <span>${escapeHtml(opt)}</span>
      </button>`).join('');

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
    document.querySelectorAll('.option').forEach((el,i) => el.classList.toggle('selected', i === idx));
    document.getElementById('confirmBtn').disabled = false;
  }

  function confirmAnswer() {
    if (answered || selectedIndex === null) return;
    answered = true;

    const q = sessionQuestions[currentIndex];
    const ok = selectedIndex === q.answer;
    if (ok) {
      correctCount++;
      removeError(q.id);
    } else {
      wrongCount++;
      addError(q.id);
    }

    document.querySelectorAll('.option').forEach((el,i) => {
      el.classList.remove('selected');
      if (i === q.answer) el.classList.add('correct');
      if (i === selectedIndex && !ok) el.classList.add('wrong');
    });

    const feedback = document.getElementById('feedback');
    feedback.className = ok
      ? 'mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4'
      : 'mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4';
    feedback.innerHTML = `
      <div class="text-xs font-black ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${ok ? 'Correto' : 'Incorreto'}</div>
      <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">${escapeHtml(q.explanation || '')}</div>
      <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Resposta correta: <strong>${String.fromCharCode(65+q.answer)}. ${escapeHtml(q.options[q.answer])}</strong></div>`;

    document.getElementById('confirmBtn').classList.add('hidden');
    const next = document.getElementById('nextBtn');
    next.classList.remove('hidden');
    next.textContent = currentIndex === sessionQuestions.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
    document.getElementById('scoreNow').textContent = `${correctCount} certas`;
    refreshStats();
  }

  function nextQuestion() {
    if (!answered) return;
    if (currentIndex < sessionQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
      const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--study-shell-offset')) || 124;
      window.scrollTo({top: Math.max(0, document.getElementById('session').offsetTop - offset - 8), behavior:'smooth'});
    } else finishSession();
  }

  function finishSession() {
    const total = sessionQuestions.length;
    const rate = Math.round(correctCount / total * 100);
    localStorage.setItem(lastKey(), JSON.stringify({rate,total,correct:correctCount,date:Date.now(),difficulty:activeDifficulty}));

    document.getElementById('session').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('resultScore').textContent = `${rate}%`;
    document.getElementById('resultText').textContent =
      rate >= 80 ? `Bom domínio no banco ${diffName().toLowerCase()}. Revê os erros para consolidar.`
      : rate >= 60 ? `Domínio parcial no banco ${diffName().toLowerCase()}. Repete os temas em que falhaste.`
      : `Ainda há conceitos frágeis no banco ${diffName().toLowerCase()}. Volta ao resumo e revê os erros.`;

    document.getElementById('resultCorrect').textContent = correctCount;
    document.getElementById('resultWrong').textContent = wrongCount;
    document.getElementById('resultReview').textContent = getErrorIds().length;
    refreshStats();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function exitSession() {
    if (confirm('Sair deste treino? O progresso desta sessão não será guardado como resultado final.')) backToSetup();
  }

  function backToSetup() {
    document.getElementById('session').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('setup').classList.remove('hidden');
    refreshStats();
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function resetProgress() {
    if (!confirm(`Limpar erros e último resultado do banco ${diffName().toLowerCase()}?`)) return;
    localStorage.removeItem(errorKey());
    localStorage.removeItem(lastKey());
    refreshStats();
  }

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  Object.assign(window, {
    clearSearch, applySearch, setTrainingDifficulty, startRandom, startTopic,
    startErrors, selectOption, confirmAnswer, nextQuestion, exitSession,
    backToSetup, resetProgress
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTraining, {once:true});
  } else {
    initTraining();
  }
})();
