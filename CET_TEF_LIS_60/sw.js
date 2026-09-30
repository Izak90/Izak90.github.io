const CACHE_NAME = 'cet-tef-v11';

const PRECACHE_URLS = [
    './',
    './index.html',
    './manifest.json',
    './plano_mj.html',
    './plano.html',
    './sw.js',

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

    './centro_estudo/index.html',
    './centro_estudo/PEVS_estudo/resumo.html',
    './centro_estudo/PEVS_estudo/simulador.html',
    './centro_estudo/PEVS_estudo/banco_80_perguntas.json',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (
                    !response ||
                    response.status !== 200 ||
                    response.type === 'opaque'
                ) {
                    return response;
                }

                const copy = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, copy);
                });

                return response;
            })
            .catch(() => caches.match(event.request))
    );
});