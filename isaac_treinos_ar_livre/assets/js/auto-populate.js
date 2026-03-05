/**
 * AUTO-POPULATE - Atualização automática de dados dinâmicos
 * 
 * Este script procura elementos com atributos data-* e preenche automaticamente
 * com os valores do SiteConfig.
 * 
 * USO:
 * <span data-config="turma.vagasDisponiveis"></span>
 * <span data-config="turma.precoFundador" data-format="price"></span>
 * <a data-config-href="whatsapp" data-whatsapp-msg="Quero inscrever">Contactar</a>
 * <a data-config-href="instagram">Instagram</a>
 * <a data-config-href="email">Email</a>
 */

(function() {
    'use strict';

    // Esperar que o DOM e o SiteConfig estejam carregados
    function initAutoPopulate() {
        if (!window.SiteConfig) {
            console.warn('⚠️ SiteConfig not loaded yet, retrying...');
            setTimeout(initAutoPopulate, 100);
            return;
        }

        const config = window.SiteConfig;

        // 1. Preencher textos com data-config
        document.querySelectorAll('[data-config]').forEach(el => {
            const path = el.getAttribute('data-config');
            const format = el.getAttribute('data-format');
            let value = getNestedValue(config, path);

            // Aplicar formatação se especificada
            if (format === 'price') {
                value = config.formatPrice(value);
            }

            el.textContent = value;
        });

        // 2. Preencher atributos (href, src, etc)
        document.querySelectorAll('[data-config-href]').forEach(el => {
            const type = el.getAttribute('data-config-href');
            
            if (type === 'whatsapp') {
                const customMsg = el.getAttribute('data-whatsapp-msg');
                el.href = config.getWhatsAppLink(customMsg);
            } else if (type === 'instagram') {
                const username = config.contacto.instagram.replace('@', '');
                el.href = `https://www.instagram.com/${username}/`;
            } else if (type === 'email') {
                el.href = `mailto:${config.contacto.email}`;
            }
        });

        // 3. Adicionar classes dinâmicas (urgência, etc)
        document.querySelectorAll('[data-config-class]').forEach(el => {
            const type = el.getAttribute('data-config-class');
            
            if (type === 'urgency') {
                const urgencyClass = config.getUrgencyClass();
                el.classList.add(urgencyClass);
            }
        });

        // 4. Atualizar barras de progresso
        document.querySelectorAll('[data-config-progress]').forEach(el => {
            const type = el.getAttribute('data-config-progress');
            
            if (type === 'turma') {
                const percentagem = (config.turma.alunosAtuais / config.turma.totalVagas) * 100;
                el.style.width = `${percentagem}%`;
            }
        });

        // 5. Atualizar meta tags e title se necessário
        updateMetaTags();

        console.log('✅ Auto-populate complete');
    }

    // Função auxiliar para obter valores aninhados (ex: "turma.vagasDisponiveis")
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => {
            return current?.[prop];
        }, obj);
    }

    // Atualizar meta tags com dados dinâmicos
    function updateMetaTags() {
        const config = window.SiteConfig;
        const vagas = config.turma.vagasDisponiveis;

        // Atualizar description se contiver placeholder
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && metaDesc.content.includes('[VAGAS]')) {
            metaDesc.content = metaDesc.content.replace('[VAGAS]', vagas);
        }
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoPopulate);
    } else {
        initAutoPopulate();
    }
})();
