/**
 * CONFIGURAÇÃO CENTRAL - Isaac Treinos Ar Livre
 * 
 * Este ficheiro centraliza todos os dados que mudam frequentemente.
 * Atualiza aqui e reflete automaticamente em todas as páginas.
 * 
 * INSTRUÇÃO: Edita apenas os valores dentro de cada propriedade.
 */

const SiteConfig = {
    /**
     * TURMA FUNDADORA
     * Atualiza o número de alunos atuais e vagas totais
     */
    turma: {
        totalVagas: 8,           // Total de vagas disponíveis
        alunosAtuais: 5,         // Alunos já inscritos
        get vagasDisponiveis() { // Cálculo automático
            return this.totalVagas - this.alunosAtuais;
        },
        descontoPercentual: 10,  // Desconto em %
        precoNormal: 60,         // Preço normal em €
        get precoFundador() {    // Cálculo automático
            return this.precoNormal * (1 - this.descontoPercentual / 100);
        }
    },

    /**
     * LIMITES DE GRUPO
     * Máximo de pessoas por sessão
     */
    limites: {
        grupoPresencial: 8,      // Máximo pessoas por sessão presencial
        grupoOnline: 999         // Sem limite para online
    },

    /**
     * ACESSO À COMUNIDADE
     * Hash SHA-256 da password (quando mudares, todos precisam da nova)
     * 
     * Para gerar novo hash:
     * 1. Abre a consola do browser (F12)
     * 2. Executa: await Security.sha256('TUA_NOVA_PASSWORD')
     * 3. Copia o hash e substitui abaixo
     * 
     * Password atual: TREINO2026
     */
    acesso: {
        passwordHash: 'bf117f5c251424269357a6a402c5c8daac6600f14324b311ead1be4ff59411e2',
        expiracaoHoras: 24       // Horas até expirar o acesso
    },

    /**
     * CONTACTO
     * Dados de contacto (WhatsApp, email, etc)
     */
    contacto: {
        whatsapp: '351939481840',
        instagram: '@isaac_treinos_ar_livre',
        email: 'isaaclopes90@gmail.com'
    },

    /**
     * HORÁRIOS
     * Horários das sessões de treino
     */
    horarios: {
        presencial: [
            { dia: 'Segunda', hora: '6:15', local: 'Parque Multidesportivo Naide Gomes' },
            { dia: 'Quarta', hora: '6:15', local: 'Parque Multidesportivo Naide Gomes' },
            { dia: 'Sexta', hora: '6:15', local: 'Parque Multidesportivo Naide Gomes' }
        ],
        online: [
            { dia: 'Terça', hora: '19:00', plataforma: 'Zoom' },
            { dia: 'Quinta', hora: '19:00', plataforma: 'Zoom' }
        ]
    },

    /**
     * MÉTODOS AUXILIARES
     * Funções úteis para usar nas páginas
     */
    getVagasText() {
        const vagas = this.turma.vagasDisponiveis;
        if (vagas === 0) return 'Esgotado';
        if (vagas === 1) return 'Última vaga!';
        return `${vagas} vagas disponíveis`;
    },

    getUrgencyClass() {
        const vagas = this.turma.vagasDisponiveis;
        if (vagas === 0) return 'urgency--sold-out';
        if (vagas <= 2) return 'urgency--critical';
        if (vagas <= 4) return 'urgency--high';
        return 'urgency--medium';
    },

    formatPrice(price) {
        return `${price.toFixed(0)}€`;
    },

    getWhatsAppLink(message = 'Olá! Quero saber mais sobre os treinos') {
        return `https://wa.me/${this.contacto.whatsapp}?text=${encodeURIComponent(message)}`;
    }
};

// Exportar para uso global
window.SiteConfig = SiteConfig;

console.log('✅ Site Config loaded:', {
    vagasDisponiveis: SiteConfig.turma.vagasDisponiveis,
    precoFundador: SiteConfig.formatPrice(SiteConfig.turma.precoFundador)
});
