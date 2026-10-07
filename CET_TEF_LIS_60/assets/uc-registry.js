(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.AcademyUCRegistry = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const local = value => text(value) && /^\.\/[a-zA-Z0-9_/-]+\.(html|json)$/.test(value) && !value.includes('/../');
  const external = value => value === null || (text(value) && /^https:\/\//.test(value));
  function validate(data) {
    const errors = [];
    if (!data || data.version !== 1 || !Array.isArray(data.ucs) || !data.ucs.length) return ['Registo: version 1 e lista ucs não vazia obrigatórias.'];
    const slugs = new Set(), titles = new Set(), orders = new Set();
    data.ucs.forEach((uc, i) => {
      const label = `ucs[${i}]`;
      if (!uc || typeof uc !== 'object') { errors.push(`${label}: objeto obrigatório.`); return; }
      if (!text(uc.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(uc.slug) || slugs.has(uc.slug)) errors.push(`${label}: slug inválido/repetido.`);
      if (!text(uc.title) || /[<>]/.test(uc.title) || titles.has(uc.title)) errors.push(`${label}: título inválido/repetido.`);
      if (!Number.isInteger(uc.order) || uc.order < 1 || orders.has(uc.order)) errors.push(`${label}: ordem inválida/repetida.`);
      slugs.add(uc.slug); titles.add(uc.title); orders.add(uc.order);
      for (const key of ['summary','training','simulator','workbook']) if (uc[key] !== null && (!local(uc[key]) || !uc[key].endsWith('.html'))) errors.push(`${label}.${key}: URL local ou null obrigatório.`);
      for (const key of ['driveUrl','asynchronousClass']) if (!external(uc[key])) errors.push(`${label}.${key}: HTTPS ou null obrigatório.`);
      if (uc.trainer !== null && !text(uc.trainer)) errors.push(`${label}.trainer: texto ou null obrigatório.`);
      const seen = new Set();
      if (!Array.isArray(uc.difficulties)) errors.push(`${label}.difficulties: lista obrigatória.`);
      else for (const d of uc.difficulties) {
        if (!d || !['easy','medium','hard'].includes(d.id) || seen.has(d.id) || !text(d.label) || !local(d.bank) || !d.bank.endsWith('.json')) errors.push(`${label}: dificuldade inválida/repetida.`);
        seen.add(d?.id);
      }
      if (uc.difficulties?.length && (!uc.training || !uc.simulator)) errors.push(`${label}: dificuldades exigem treino e simulador.`);
      const status = uc.sourceStatus;
      if (!status || status.materials !== 'linked_not_imported' || !['declared_audit','not_audited','source_reviewed'].includes(status.coverage) || !['transcribed_unverified_key','no_exercises_reported'].includes(status.workbook)) errors.push(`${label}: estado de fontes inválido.`);
    });
    return errors;
  }
  function toMaps(data) {
    const errors = validate(data);
    if (errors.length) throw new Error(errors.join(' '));
    const maps = {all27UC:[],simulatorUrls:{},studyCenterUrls:{},studyCenterTrainingUrls:{},studyCenterSimulatorUrls:{},moduleConfig:{}};
    for (const uc of [...data.ucs].sort((a,b)=>a.order-b.order)) {
      maps.all27UC.push(uc.title);
      for (const [field,map] of [['workbook','simulatorUrls'],['summary','studyCenterUrls'],['training','studyCenterTrainingUrls'],['simulator','studyCenterSimulatorUrls']]) if (uc[field]) maps[map][uc.title] = uc[field];
      const cfg = {};
      for (const key of ['trainer','driveUrl','asynchronousClass']) if (uc[key]) cfg[key] = uc[key];
      maps.moduleConfig[uc.title] = cfg;
    }
    return maps;
  }
  async function load(url) {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(),10000);
    try {
      const response = await fetch(url,{signal:controller.signal});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json(), errors = validate(data);
      if (errors.length) throw new Error(errors.join(' '));
      return data;
    } finally { clearTimeout(timeout); }
  }
  return {validate,toMaps,load};
});
