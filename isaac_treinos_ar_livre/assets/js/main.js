/**
 * Main JavaScript
 * Script principal da aplicação
 */

'use strict';

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navegação via teclado melhorada
document.addEventListener('keydown', (e) => {
  // Esc para voltar (simula botão voltar)
  if (e.key === 'Escape') {
    const backButton = document.querySelector('.button--back');
    if (backButton) {
      window.location.href = backButton.getAttribute('href');
    }
  }
});

// Lazy loading de imagens
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback para navegadores sem suporte
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Analytics de navegação (opcional)
const trackNavigation = (pageName) => {
  console.log(`Navegação: ${pageName}`);
  // Aqui pode adicionar Google Analytics, etc.
};

// Track quando página carrega
trackNavigation(document.title);
