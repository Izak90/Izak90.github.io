(() => {
    const REDIRECT_CONFIG = {
        // Define como false para desativar o redirecionamento em todas as páginas.
        enabled: true
    };

    if (!REDIRECT_CONFIG.enabled) {
        return;
    }

    const scriptElement = document.currentScript;
    if (!scriptElement) {
        throw new Error("Não foi possível determinar a localização de redirect-control.js.");
    }

    const destination = new URL("index_redirect_countdown.html", scriptElement.src);
    if (window.location.pathname !== destination.pathname) {
        window.location.replace(destination.href);
    }
})();
