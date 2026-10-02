const CACHE_NAME = 'cet-tef-v16';

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

  // Centro de Estudo — Pedagogia do Exercício
  './centro_estudo/pedex_resumo.html',
  './centro_estudo/pedex_treino.html',
  './centro_estudo/pedex_simulador.html',
  './centro_estudo/pedex_banco_80_perguntas.json',

  // Centro de Estudo — Coaching no Fitness
  './centro_estudo/cf_resumo.html',
  './centro_estudo/cf_treino.html',
  './centro_estudo/cf_simulador.html',
  './centro_estudo/cf_banco_80_perguntas.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Ficheiros essenciais.
      await cache.addAll(CORE_URLS);

      // Um ficheiro opcional em falta não bloqueia a instalação do SW.
      await Promise.allSettled(
        OPTIONAL_URLS.map(url => cache.add(url))
      );

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
          .filter(key => key !== CACHE_NAME)
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

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        // Network-first para receber alterações imediatamente quando há rede.
        const response = await fetch(request);

        // Cache de runtime apenas para respostas válidas da mesma origem.
        if (
          response &&
          response.status === 200 &&
          response.type === 'basic'
        ) {
          cache.put(request, response.clone());
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
