const CACHE_NAME = 'cet-tef-v23';

const CORE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
];

const OPTIONAL_URLS = [
  './plano_mj.html',
  './plano.html',

  // Design partilhado do Centro de Estudo
  './data/ucs.json',
  './assets/uc-registry.js',
  './assets/app.css',
  './assets/study.css',
  './assets/study.js',
  './assets/training.css',
  './assets/training.js',
  './assets/simulator.css',
  './assets/simulator.js',

  // Simuladores por UC
  './simuladores/index.html',
  './simuladores/uc01_coaching_no_fitness.html',
  './simuladores/uc02_pedagogia_do_exercicio.html',
  './simuladores/uc03_promocao_de_estilos_de_vida_saudavel.html',
  './simuladores/uc04_psicologia_do_exercicio.html',
  './simuladores/uc05_comunicacao_no_fitness.html',
  './simuladores/uc06_ingles_no_fitness.html',
  './simuladores/uc07_biomecanica_do_exercicio.html',
  './simuladores/uc08_aplicacoes_digitais.html',
  './simuladores/uc09_primeiros_socorros_no_exercicio.html',
  './simuladores/uc10_nutricao_e_suplementacao.html',
  './simuladores/uc11_marketing_no_fitness.html',
  './simuladores/uc12_gestao_de_clientes_no_fitness.html',
  './simuladores/uc13_satisfacao_de_clientes_no_fitness.html',
  './simuladores/uc14_treino_de_fitness_online.html',
  './simuladores/uc15_etica_e_deontologia_no_fitness.html',
  './simuladores/uc16_gestao_no_fitness.html',
  './simuladores/uc17_empreendedorismo_no_fitness.html',

  // Centro de Estudo — PEVS
  './centro_estudo/pevs_resumo.html',
  './centro_estudo/pevs_treino.html',
  './centro_estudo/pevs_simulador.html',
  './centro_estudo/pevs_banco_80_perguntas.json',
  './centro_estudo/pevs_banco_80_perguntas_medio.json',
  './centro_estudo/pevs_banco_80_perguntas_dificil.json',

  // Centro de Estudo — Pedagogia do Exercício
  './centro_estudo/pedex_resumo.html',
  './centro_estudo/pedex_treino.html',
  './centro_estudo/pedex_simulador.html',
  './centro_estudo/pedex_banco_80_perguntas.json',
  './centro_estudo/pedex_banco_80_perguntas_medio.json',
  './centro_estudo/pedex_banco_80_perguntas_dificil.json',

  // Centro de Estudo — Coaching no Fitness
  './centro_estudo/cf_resumo.html',
  './centro_estudo/cf_treino.html',
  './centro_estudo/cf_simulador.html',
  './centro_estudo/cf_banco_80_perguntas.json',
  './centro_estudo/cf_banco_80_perguntas_medio.json',
  './centro_estudo/cf_banco_80_perguntas_dificil.json',

  // Centro de Estudo — Psicologia do Exercício
  './centro_estudo/psiex_resumo.html',
  './centro_estudo/psiex_treino.html',
  './centro_estudo/psiex_simulador.html',
  './centro_estudo/psicologia-do-exercicio_banco_80_perguntas.json'
];

// Dependências visuais usadas pelas páginas estáticas; mantém Tailwind via CDN.
const EXTERNAL_URLS = [
  'https://cdn.tailwindcss.com/',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://www.grupo-academy.pt/wp-content/uploads/2022/11/Logo-Grupo-A.png'
];

function isExternalAsset(url) {
  return EXTERNAL_URLS.includes(url.href) ||
    (url.origin === 'https://fonts.gstatic.com' && url.pathname.startsWith('/s/inter/')) ||
    (url.origin === 'https://cdnjs.cloudflare.com' &&
      url.pathname.startsWith('/ajax/libs/font-awesome/6.4.0/webfonts/'));
}

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Ficheiros essenciais.
      await cache.addAll(CORE_URLS);

      // Um ficheiro opcional em falta não bloqueia a instalação do SW.
      const optional = [...OPTIONAL_URLS, ...EXTERNAL_URLS];
      const results = await Promise.allSettled(optional.map(async url => {
        if (EXTERNAL_URLS.includes(url)) {
          const request = new Request(url, { mode: 'no-cors', cache: 'reload' });
          const response = await fetch(request);
          if (!response.ok && response.type !== 'opaque') throw new Error(`HTTP ${response.status}`);
          await cache.put(request, response);
        } else {
          await cache.add(url);
        }
      }));
      results.forEach((result, index) => {
        if (result.status === 'rejected') console.warn('Precache indisponível:', optional[index], result.reason);
      });

      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(key => key.startsWith('cet-tef-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) {
    return;
  }

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !isExternalAsset(url)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        // Network-first para receber alterações imediatamente quando há rede.
        const response = await fetch(request);

        if (response.status >= 500) {
          const cached = await cache.match(request);
          if (cached) return cached;
        }

        // Mesma origem e lista explícita de recursos visuais externos.
        if (response.ok || (!sameOrigin && response.type === 'opaque')) {
          try { await cache.put(request, response.clone()); }
          catch (error) { console.warn('Não foi possível guardar em cache:', request.url, error); }
        }

        return response;
      } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;

        // Fallback da app para navegação offline.
        if (request.mode === 'navigate') {
          const appShell = await cache.match('./index.html');
          if (appShell) return appShell;
        }

        throw error;
      }
    })()
  );
});
