export const seedEvents = [{
  id: 'enerelis-novembro-2026', title: 'Próximo encontro com a autora',
  month: '2026-11', day: null, time: '', location: '',
  status: 'Anúncio brevemente',
  description: 'Uma nova oportunidade de encontrar Patrícia Costa e o universo de Crónicas de Enerelis. Local, data e programa serão anunciados pela autora.',
  url: 'https://www.instagram.com/cdenerelis/',
  source: 'Perfil @cdenerelis · captura fornecida em 29/10/2026'
}];

export function validEvents(items) {
  return Array.isArray(items) && items.length <= 50 && items.every(event => {
    if (!event || typeof event.id !== 'string' || !event.id || event.id.length > 100) return false;
    if (typeof event.title !== 'string' || !event.title.trim() || event.title.length > 100) return false;
    if (typeof event.month !== 'string' || !/^(20\d{2}|2100)-(0[1-9]|1[0-2])$/.test(event.month)) return false;
    const [year, month] = event.month.split('-').map(Number);
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (event.day !== null && (!Number.isInteger(event.day) || event.day < 1 || event.day > lastDay)) return false;
    if (typeof event.time !== 'string' || event.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.time)) return false;
    if (!['Anúncio brevemente', 'Confirmado', 'Cancelado'].includes(event.status)) return false;
    for (const [field, max] of [['location', 150], ['description', 1000], ['url', 500]]) {
      if (typeof event[field] !== 'string' || event[field].length > max) return false;
    }
    if (!event.description.trim()) return false;
    if (event.source !== undefined && (typeof event.source !== 'string' || event.source.length > 200)) return false;
    if (event.url) {
      try { const url = new URL(event.url); if (url.protocol !== 'https:' || url.username || url.password) return false; }
      catch { return false; }
    }
    return true;
  }) && new Set(items.map(event => event.id)).size === items.length;
}

export function lisbonToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Lisbon', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
  const get = type => parts.find(part => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function upcomingEvents(events, today = lisbonToday()) {
  return events.filter(event => `${event.month}-${String(event.day ?? 31).padStart(2, '0')}` >= today)
    .sort((a, b) => `${a.month}-${String(a.day ?? 31).padStart(2,'0')}`.localeCompare(`${b.month}-${String(b.day ?? 31).padStart(2,'0')}`));
}

export function initEvents({esc, toast}) {
  const $ = selector => document.querySelector(selector), key = 'cdenerelis.events.v1';
  let events = structuredClone(seedEvents);
  try { const saved = JSON.parse(localStorage.getItem(key)); if (validEvents(saved)) events = saved; } catch {}
  const monthName = event => new Intl.DateTimeFormat('pt-PT', {month:'long',timeZone:'UTC'})
    .format(new Date(`${event.month}-15T12:00:00Z`));
  const monthLabel = event => `${monthName(event)[0].toUpperCase()}${monthName(event).slice(1)} ${event.month.slice(0,4)}`;
  const save = next => {
    if (!validEvents(next)) { toast('Verifica a data e os campos do evento. Usa ligações HTTPS.'); return false; }
    try { localStorage.setItem(key, JSON.stringify(next)); events = next; render(); renderStudio(); return true; }
    catch { toast('Não foi possível guardar a agenda neste navegador.'); return false; }
  };
  function render() {
    const upcoming = upcomingEvents(events), next = upcoming.find(event => event.status !== 'Cancelado');
    $('#next-event-date').textContent = next ? monthLabel(next) : 'Novas datas a anunciar';
    $('#next-event-status').textContent = next ? next.status : 'Acompanha a autora';
    $('#events').innerHTML = upcoming.length ? upcoming.map(event => `
      <article class="event-card${event.status === 'Cancelado' ? ' is-cancelled' : ''}">
        <div class="event-card-top"><div><time class="event-month" datetime="${esc(event.month + (event.day ? '-' + String(event.day).padStart(2,'0') : ''))}">${event.day ? `${event.day} · ` : ''}${esc(monthName(event)[0].toUpperCase() + monthName(event).slice(1))}</time><span class="event-year">${esc(event.month.slice(0,4))}</span></div><span class="event-status">${esc(event.status)}</span></div>
        <h3>${esc(event.title)}</h3><p class="event-location">${esc(event.location || 'Local e programa a anunciar')}${event.time ? ` · ${esc(event.time)}` : ''}</p>
        <p class="event-description">${esc(event.description)}</p>
        ${event.url ? `<a class="inline-link" href="${esc(event.url)}" target="_blank" rel="noopener noreferrer">${event.status === 'Confirmado' ? 'Informações do evento' : 'Acompanhar os anúncios'} ↗</a>` : ''}
        <p class="event-source">${esc(event.source || 'Informação adicionada no Estúdio de demonstração.')}</p>
      </article>`).join('') : '<article class="event-card"><h3>Novas datas a caminho.</h3><p class="event-description">Assim que forem anunciados, os próximos encontros terão aqui o seu lugar.</p><a class="inline-link" href="https://www.instagram.com/cdenerelis/" target="_blank" rel="noopener noreferrer">Acompanhar a autora ↗</a></article>';
  }
  function renderStudio() {
    $('#event-studio-list').innerHTML = events.map(event => `<div class="studio-row"><div><strong>${esc(event.title)}</strong><small>${esc(monthLabel(event))}${event.day ? ` · dia ${event.day}` : ''} · ${esc(event.status)}</small></div><button data-event-edit="${esc(event.id)}">Editar</button><button class="delete" data-event-delete="${esc(event.id)}">Eliminar</button></div>`).join('') || '<p class="detail-note">Ainda não há eventos. Adiciona um novo encontro.</p>';
  }
  const form = $('#event-editor');
  function edit(event) {
    form.reset(); form.hidden = false;
    $('#event-editor-title').textContent = event ? 'Editar evento' : 'Novo evento';
    if (event) for (const field of ['id','title','month','day','time','location','description','status','url']) form.elements[field].value = event[field] ?? '';
    form.scrollIntoView({behavior:'smooth',block:'start'}); form.elements.title.focus({preventScroll:true});
  }
  $('#new-event').onclick = () => edit();
  $('#cancel-event').onclick = () => { form.hidden = true; };
  $('#event-studio-list').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.eventEdit) edit(events.find(item => item.id === button.dataset.eventEdit));
    if (button.dataset.eventDelete && confirm('Eliminar este evento da agenda deste navegador?')) {
      if (save(events.filter(item => item.id !== button.dataset.eventDelete))) { form.hidden = true; toast('Evento eliminado.'); }
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault(); const fields = form.elements;
    const old = events.find(item => item.id === fields.id.value);
    const item = {id:old?.id || crypto.randomUUID(), title:fields.title.value.trim(), month:fields.month.value,
      day:fields.day.value ? Number(fields.day.value) : null, time:fields.time.value,
      location:fields.location.value.trim(), status:fields.status.value, description:fields.description.value.trim(),
      url:fields.url.value.trim(), source:'Informação adicionada no Estúdio de demonstração.'};
    if (save(old ? events.map(entry => entry.id === old.id ? item : entry) : [...events,item])) { form.hidden = true; toast('Evento guardado neste navegador.'); }
  });
  $('#export-events').onclick = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(events,null,2)], {type:'application/json'}));
    const link = document.createElement('a'); link.href = url; link.download = 'enerelis-agenda.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  $('#import-events').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 150000) throw Error();
      const next = JSON.parse(await file.text()); if (!validEvents(next)) throw Error();
      if (confirm('Substituir a agenda deste navegador pelo ficheiro selecionado?') && save(next)) { form.hidden = true; toast('Agenda importada.'); }
    } catch { toast('Agenda inválida. Usa um ficheiro JSON exportado pelo Estúdio (até 150 KB).'); }
    finally { event.target.value = ''; }
  });
  render(); renderStudio();
}
