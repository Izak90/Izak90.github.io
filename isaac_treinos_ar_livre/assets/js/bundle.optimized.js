/**
 * Isaac Treinos Ar Livre - Optimized Bundle
 * Consolidated & optimized JavaScript for mobile performance
 * Version: 2.0
 */

(function() {
    'use strict';
    
    /**
     * Main App Object
     */
    const IsaacApp = {
        /**
         * Initialize all modules
         */
        init() {
            this.initIcons();
            this.initMobileMenu(); // Fallback for pages not using web component
            this.initFAQ();
            this.initSmoothScroll();
            this.initKeyboardNav();
            this.trackPageView();
        },
        
        /**
         * Initialize Lucide Icons
         */
        initIcons() {
            // Verificar se já foi inicializado na página
            if (window.LUCIDE_ICONS_INITIALIZED) {
                console.log('⚠️ Lucide icons already initialized by page, skipping...');
                return;
            }
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                console.log('✅ Lucide icons initialized');
            }
        },
        
        /**
         * Mobile Menu Toggle
         * Optimized with proper accessibility and touch handling
         */
        initMobileMenu() {
            const toggle = document.querySelector('.header__toggle');
            const nav = document.querySelector('.header__nav');
            
            if (!toggle || !nav) return;
            
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
            
            console.log('✅ Mobile menu initialized (bundle)');
        },
        
        /**
         * Legacy sticky-menu support
         */
        initLegacyStickyMenu() {
            const menuToggle = document.querySelector('.sticky-menu__toggle');
            const menuNav = document.querySelector('.sticky-menu__nav');
            
            if (menuToggle && menuNav) {
                menuToggle.addEventListener('click', () => {
                    menuNav.classList.toggle('active');
                });
            }
        },
        
        /**
         * FAQ Accordion
         */
        initFAQ() {
            const questions = document.querySelectorAll('.faq__question');
            
            if (questions.length === 0) return;
            
            questions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const isActive = question.classList.contains('active');
                    
                    // Close all FAQs
                    questions.forEach(q => {
                        q.classList.remove('active');
                        q.nextElementSibling?.classList.remove('active');
                    });
                    
                    // Open current if it wasn't active
                    if (!isActive && answer) {
                        question.classList.add('active');
                        answer.classList.add('active');
                    }
                });
            });
            
            console.log('✅ FAQ accordion initialized');
        },
        
        /**
         * Smooth Scroll for anchor links
         */
        initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Ignore empty anchors
                    if (href === '#' || !href) return;
                    
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        // Offset for fixed header
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without jumping
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                });
            });
            
            console.log('✅ Smooth scroll initialized');
        },
        
        /**
         * Keyboard Navigation Enhancements
         */
        initKeyboardNav() {
            document.addEventListener('keydown', (e) => {
                // ESC to go back (if back button exists)
                if (e.key === 'Escape') {
                    const backButton = document.querySelector('.back-link, .button--back');
                    if (backButton && !document.querySelector('.header__nav.active')) {
                        window.history.back();
                    }
                }
            });
        },
        
        /**
         * Track page view (placeholder for analytics)
         */
        trackPageView() {
            const pageName = document.title;
            console.log(`📊 Page view: ${pageName}`);
            
            // Add Google Analytics or other tracking here
            // Example: gtag('event', 'page_view', { page_title: pageName });
        },
        
        /**
         * Lazy load images
         * Native lazy loading with fallback
         */
        initLazyImages() {
            if ('loading' in HTMLImageElement.prototype) {
                // Native lazy loading supported
                const images = document.querySelectorAll('img[loading="lazy"]');
                images.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
            } else {
                // Fallback: Use Intersection Observer
                this.initIntersectionObserver();
            }
        },
        
        /**
         * Intersection Observer for lazy loading (fallback)
         */
        initIntersectionObserver() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    };
    
    /**
     * Initialize when DOM is ready
     */
    const initApp = () => {
        IsaacApp.init();
        
        // Also init legacy menu if exists
        IsaacApp.initLegacyStickyMenu();
        
        console.log('✅ Isaac Treinos App initialized');
    };
    
    // DOM Ready check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // DOM already loaded
        initApp();
    }
    
    // Expose globally for debugging
    window.IsaacApp = IsaacApp;
    
})();
