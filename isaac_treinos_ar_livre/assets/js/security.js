/**
 * SECURITY UTILITIES - Funções de segurança
 * 
 * Fornece funções para hash de passwords e validação segura
 */

const Security = {
    /**
     * Gera hash SHA-256 de uma string
     * @param {string} text - Texto para fazer hash
     * @returns {Promise<string>} Hash em formato hexadecimal
     */
    async sha256(text) {
        // Converter string para Uint8Array
        const msgBuffer = new TextEncoder().encode(text);
        
        // Gerar hash usando Web Crypto API
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        
        // Converter ArrayBuffer para hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    },

    /**
     * Valida password contra hash armazenado
     * @param {string} inputPassword - Password inserida pelo utilizador
     * @param {string} storedHash - Hash armazenado no sistema
     * @returns {Promise<boolean>} True se a password está correta
     */
    async validatePassword(inputPassword, storedHash) {
        const inputHash = await this.sha256(inputPassword);
        return inputHash === storedHash;
    }
};

// Exportar para uso global
window.Security = Security;

console.log('✅ Security utilities loaded');
