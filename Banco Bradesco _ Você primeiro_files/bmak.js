/**
 * BMAK - Bot Manager Akamai Integration
 * Intercepta submissão de formulários de login do Internet Banking
 * para integração com sistema de proteção anti-bot
 */

(function() {
    'use strict';

    /**
     * Executa telemetria BMAK se disponível
     * @returns {boolean} true se executou com sucesso, false caso contrário
     */
    function executeBmakTelemetry() {
        if (typeof bmak !== 'undefined' && bmak.form_submit) {
            try {
                bmak.form_submit();
                return true;
            } catch (e) {
                // Silenciosamente ignora erros de BMAK
                return false;
            }
        }
        return false;
    }

    /**
     * Intercepta submissão de formulário de login do IB
     * @param {HTMLFormElement} form - Formulário a ser interceptado
     */
    function interceptFormSubmit(form) {
        const originalAction = form.action;
        
        // Verifica se é formulário de login do IB
        if (originalAction && originalAction.includes('ib12.bradesco.com.br/ibpfnovologin/identificacao.jsf')) {
            
            // Guarda o handler original se existir
            const originalOnSubmit = form.onsubmit;
            
            // Substitui o onsubmit
            form.onsubmit = function(event) {
                // Executa BMAK primeiro
                executeBmakTelemetry();
                
                // Executa handler original se existir
                if (originalOnSubmit && typeof originalOnSubmit === 'function') {
                    return originalOnSubmit.call(this, event);
                }
                
                return true;
            };
        }
    }

    /**
     * Inicializa interceptação de todos os formulários relevantes
     */
    function initBmakInterceptor() {
        // Aguarda DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupInterceptors);
        } else {
            setupInterceptors();
        }
    }

    /**
     * Configura interceptadores em todos os forms de login do IB
     */
    function setupInterceptors() {
        // Busca todos os forms com action do IB
        const forms = document.querySelectorAll('form[action*="ib12.bradesco.com.br/ibpfnovologin/identificacao.jsf"]');
        
        forms.forEach(function(form) {
            interceptFormSubmit(form);
        });

        // Observer para forms adicionados dinamicamente (modais, etc)
        if (window.MutationObserver) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            if (node.tagName === 'FORM') {
                                interceptFormSubmit(node);
                            } else if (node.querySelectorAll) {
                                const nestedForms = node.querySelectorAll('form[action*="ib12.bradesco.com.br/ibpfnovologin/identificacao.jsf"]');
                                nestedForms.forEach(interceptFormSubmit);
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Expõe função global para uso direto quando necessário
    window.executeBmakTelemetry = executeBmakTelemetry;

    // Inicializa automaticamente
    initBmakInterceptor();

})();
