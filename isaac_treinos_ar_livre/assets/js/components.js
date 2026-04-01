/**
 * ===========================================
 * WEB COMPONENTS LOADER
 * Sistema de componentes reutilizáveis
 * ===========================================
 */

/**
 * APP-HEADER Component
 * Header global do site com navegação
 * Suporta dois modos: 'site' (padrão) e 'comunidade'
 */
class AppHeader extends HTMLElement {
    connectedCallback() {
        const currentPage = this.getAttribute('current') || 'inicio';
        const mode = this.getAttribute('mode') || 'site'; // 'site' ou 'comunidade'
        
        if (mode === 'comunidade') {
            this.renderCommunityMenu(currentPage);
        } else {
            this.renderSiteMenu(currentPage);
        }
        
        // Re-initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Initialize mobile menu toggle after DOM is ready
        requestAnimationFrame(() => {
            this.initMobileMenu();
        });
    }
    
    renderSiteMenu(currentPage) {
        this.innerHTML = `
            <header class="header">
                <div class="header__content">
                    <a href="${this.getBasePath()}index.html" class="header__brand">
                        <img src="${this.getBasePath()}img/logo white.png" alt="Isaac Treinos Ar Livre" class="header__logo"/>
                        <span>Isaac Treinos Ar Livre</span>
                    </a>
                    
                    <button class="header__toggle" aria-label="Menu" aria-expanded="false">
                        <i data-lucide="menu"></i>
                    </button>
                    
                    <nav class="header__nav">
                        <a href="${this.getBasePath()}index.html" class="header__link ${currentPage === 'inicio' ? 'header__link--active' : ''}">Início</a>
                        <a href="${this.getBasePath()}tabela-precos.html" class="header__link ${currentPage === 'precos' ? 'header__link--active' : ''}">Preços</a>
                        <a href="${this.getBasePath()}horarios.html" class="header__link ${currentPage === 'horarios' ? 'header__link--active' : ''}">Horários</a>
                        <a href="${this.getBasePath()}comunidade.html" class="header__link ${currentPage === 'comunidade' ? 'header__link--active' : ''}">
                            Comunidade
                            <span class="header__badge-members"><i data-lucide="lock" style="width: 14px; height: 14px;"></i></span>
                        </a>
                        <a href="${this.getBasePath()}treino-experimental.html" class="header__cta">
                            <i data-lucide="zap"></i>
                            1ª Aula Grátis
                        </a>
                    </nav>
                </div>
            </header>
        `;
    }
    
    renderCommunityMenu(currentPage) {
        this.innerHTML = `
            <header class="header">
                <div class="header__content">
                    <a href="${this.getBasePath()}index.html" class="header__brand">
                        <img src="${this.getBasePath()}img/logo white.png" alt="Isaac Treinos Ar Livre" class="header__logo"/>
                        <span>Isaac Treinos Ar Livre</span>
                    </a>
                    
                    <button class="header__toggle" aria-label="Menu" aria-expanded="false">
                        <i data-lucide="menu"></i>
                    </button>
                    
                    <nav class="header__nav">
                        <a href="${this.getBasePath()}comunidade.html" class="header__link ${currentPage === 'comunidade' ? 'header__link--active' : ''}">Início</a>
                        <a href="${this.getBasePath()}comunidade/metodo-treino.html" class="header__link ${currentPage === 'metodo' ? 'header__link--active' : ''}">Método</a>
                        <a href="${this.getBasePath()}comunidade/progressoes.html" class="header__link ${currentPage === 'progressoes' ? 'header__link--active' : ''}">Progressões</a>
                        <a href="${this.getBasePath()}comunidade/desafio-semanal.html" class="header__link ${currentPage === 'desafio' ? 'header__link--active' : ''}">Desafio Semanal</a>
                        <a href="${this.getBasePath()}comunidade/desconto-referencia.html" class="header__cta ${currentPage === 'referencia' ? 'header__link--active' : ''}">Desconto Referência</a>
                    </nav>
                </div>
            </header>
        `;
    }
    
    getBasePath() {
        const depth = parseInt(this.getAttribute('depth') || '0');
        return '../'.repeat(depth);
    }
    
    initMobileMenu() {
        const toggle = this.querySelector('.header__toggle');
        const nav = this.querySelector('.header__nav');
        
        if (!toggle || !nav) {
            console.warn('⚠️ Mobile menu elements not found');
            return;
        }
        
        // Check if already initialized
        if (toggle.dataset.mobileMenuInit === 'true') {
            console.log('⚠️ Mobile menu already initialized, skipping...');
            return;
        }
        
        // Mark as initialized
        toggle.dataset.mobileMenuInit = 'true';
        
        // Toggle menu
        const toggleMenu = (forceClose = false) => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const shouldClose = forceClose || isExpanded;
            
            toggle.setAttribute('aria-expanded', String(!shouldClose));
            nav.classList.toggle('active', !shouldClose);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = shouldClose ? '' : 'hidden';
        };
        
        // Click handler
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                toggleMenu(true);
            }
        });
        
        // Close when clicking menu links
        nav.querySelectorAll('.header__link, .header__cta').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => toggleMenu(true), 150);
            });
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleMenu(true);
            }
        });
        
        console.log('✅ Mobile menu initialized (component)');
    }
}

/**
 * APP-FOOTER Component
 * Footer global do site
 */
class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <div class="footer__container container">
                    <!-- LEFT COLUMN: BRAND -->
                    <div class="footer__left">
                        <div class="footer__brand">
                            <img src="${this.getBasePath()}img/logo white.png" alt="Isaac Treinos Ar Livre" class="footer__logo"/>
                            <h3 class="footer__brand-title">Isaac<br>Treinos<br>Ar Livre</h3>
                        </div>
                        <p class="footer__tagline">
                            Treino funcional & calistenia personalizado ao ar livre
                        </p>
                        <div class="footer__social">
                            <a href="https://wa.me/351939481840" target="_blank" rel="noopener" aria-label="WhatsApp" class="footer__social-link">
                                <i data-lucide="message-circle"></i>
                            </a>
                            <a href="https://www.instagram.com/isaac_treinos_ar_livre/" target="_blank" rel="noopener" aria-label="Instagram" class="footer__social-link">
                                <i data-lucide="instagram"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- RIGHT COLUMN: LINKS (4 SUBCOLS) -->
                    <div class="footer__right">
                        <div class="footer__column">
                            <h4 class="footer__column-title">Navegação</h4>
                            <a href="${this.getBasePath()}index.html" class="footer__link">Início</a>
                            <a href="${this.getBasePath()}tabela-precos.html" class="footer__link">Preços</a>
                            <a href="${this.getBasePath()}horarios.html" class="footer__link">Horários</a>
                            <a href="${this.getBasePath()}comunidade.html" class="footer__link">Comunidade</a>
                            <a href="${this.getBasePath()}treino-experimental.html" class="footer__link">1ª Aula Grátis</a>
                        </div>
                        
                        <div class="footer__column">
                            <h4 class="footer__column-title">Contactos</h4>
                            <a href="https://wa.me/351939481840" target="_blank" rel="noopener" class="footer__link">
                                <i data-lucide="phone" style="width: 16px; height: 16px;"></i>
                                <span>+351 939 481 840</span>
                            </a>
                            <a href="mailto:isaaclopes90@gmail.com" class="footer__link">
                                <i data-lucide="mail" style="width: 16px; height: 16px;"></i>
                                <span>isaaclopes90@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
                    
                <div class="footer__bottom">
                    <p class="footer__copyright">&copy; ${new Date().getFullYear()} Isaac Treinos Ar Livre. Todos os direitos reservados.</p>
                </div>
            </footer>
        `;
        
        // Re-initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
    }
    
    getBasePath() {
        const depth = parseInt(this.getAttribute('depth') || '0');
        return '../'.repeat(depth);
    }
}

/**
 * APP-WHATSAPP Component
 * Botão flutuante WhatsApp
 */
class AppWhatsapp extends HTMLElement {
    connectedCallback() {
        const phoneNumber = this.getAttribute('phone') || '351939481840';
        const message = this.getAttribute('message') || 'Olá! Estou interessado nos treinos ao ar livre.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        this.innerHTML = `
            <a href="${whatsappUrl}" 
               class="whatsapp-float" 
               target="_blank" 
               rel="noopener"
               aria-label="Contactar via WhatsApp">
                <i data-lucide="message-circle"></i>
            </a>
        `;
        
        // Re-initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

/**
 * APP-ACCESS-PROTECTION Component
 * Modal de proteção de acesso para áreas restritas
 */
class AppAccessProtection extends HTMLElement {
    connectedCallback() {
        const storageKey = this.getAttribute('storage-key') || 'accessGranted';
        
        // Usar hash do SiteConfig (se disponível) ou fallback para atributo
        const passwordHash = window.SiteConfig?.acesso?.passwordHash || 
                           this.getAttribute('password') || 
                           'bf117f5c251424269357a6a402c5c8daac6600f14324b311ead1be4ff59411e2';
        
        this.innerHTML = `
            <div class="access-protection" id="accessProtection">
                <div class="access-card">
                    <button class="access-card__close" id="closeAccessModal" aria-label="Fechar">
                        <i data-lucide="x"></i>
                    </button>
                    
                    <div class="access-card__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    
                    <h2 class="access-card__title">Turma Fundadora</h2>
                    <p class="access-card__subtitle">Área exclusiva para membros da comunidade</p>
                    
                    <input 
                        type="password" 
                        class="access-card__input" 
                        id="accessPassword" 
                        placeholder="Código de Acesso"
                        autocomplete="off">
                    
                    <button class="access-card__button" id="submitPassword">Acessar</button>
                    
                    <p class="access-card__error" id="accessError">Password incorreta. Tenta novamente.</p>
                    
                    <div class="access-card__help">
                        Não tens o código? <a href="https://wa.me/351939481840" target="_blank" rel="noopener">Solicitar no WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
        
        // Re-initialize Lucide icons after DOM is ready
        requestAnimationFrame(() => {
            if (window.lucide) {
                lucide.createIcons();
            }
        });
        
        // Initialize access protection logic
        this.initAccessProtection(storageKey, passwordHash);
    }
    
    getBasePath() {
        const depth = parseInt(this.getAttribute('depth') || '0');
        return '../'.repeat(depth);
    }
    
    initAccessProtection(storageKey, correctPasswordHash) {
        const protectionDiv = this.querySelector('#accessProtection');
        const passwordInput = this.querySelector('#accessPassword');
        const submitButton = this.querySelector('#submitPassword');
        const closeButton = this.querySelector('#closeAccessModal');
        const errorMessage = this.querySelector('#accessError');
        
        // Check if already has access and if it hasn't expired (24h)
        const accessTimestamp = sessionStorage.getItem(`${storageKey}_timestamp`);
        const hasValidAccess = sessionStorage.getItem(storageKey) === 'true' && 
                               accessTimestamp && 
                               (Date.now() - parseInt(accessTimestamp)) < 24 * 60 * 60 * 1000;
        
        if (hasValidAccess) {
            protectionDiv.classList.add('hidden');
            return;
        } else {
            // Clear expired access
            sessionStorage.removeItem(storageKey);
            sessionStorage.removeItem(`${storageKey}_timestamp`);
        }
        
        // Submit password (async para validar hash)
        const checkPassword = async () => {
            // Validar password usando hash SHA-256
            const isValid = await window.Security.validatePassword(
                passwordInput.value.toUpperCase(), 
                correctPasswordHash
            );
            
            if (isValid) {
                sessionStorage.setItem(storageKey, 'true');
                sessionStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
                protectionDiv.classList.add('hidden');
                errorMessage.classList.remove('show');
            } else {
                errorMessage.classList.add('show');
                passwordInput.value = '';
                passwordInput.focus();
            }
        };
        
        submitButton.addEventListener('click', checkPassword);
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        // Close modal (navigate back)
        closeButton.addEventListener('click', () => {
            window.history.back();
        });
        
        // Focus password input on load
        setTimeout(() => passwordInput.focus(), 100);
    }
}

/**
 * APP-COMMUNITY-SUBMENU Component
 * Sub-navegação para páginas da comunidade
 */
// Register custom elements
customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
customElements.define('app-whatsapp', AppWhatsapp);
customElements.define('app-access-protection', AppAccessProtection);

console.log('✅ Web Components loaded successfully');
