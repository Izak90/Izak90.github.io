/**
 * Isaac Treinos - Main JavaScript
 * Inicialização de componentes e interatividade
 */

// Inicializar Lucide Icons quando disponível
document.addEventListener('DOMContentLoaded', () => {
    // Substituir ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Mobile menu initialization handled by components.js web component
    
    // Toggle mobile menu (legacy sticky-menu)
    const menuToggle = document.querySelector('.sticky-menu__toggle');
    const menuNav = document.querySelector('.sticky-menu__nav');
    
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', () => {
            menuNav.classList.toggle('active');
        });
    }
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
});
