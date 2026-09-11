/**
 * Script para verificar tela de indisponibilidade via GraphQL
 * Ambiente: Adobe AEM Author
 */

// Variável global para armazenar os dados da API
let apiData = {
    ativo: null,
    url: null
};

let apiRequestPromise = null;

function obterConfigIndisponibilidade() {
    return {
        endpoint: 'https://assets.bradesco/graphql/execute.json/tela_indisponibilidade/tela_indisponibilidade',
    };
}

function criarHeadersRequisicao(config) {
    return {
        'Content-Type': 'application/json'
    };
}

async function buscarDadosIndisponibilidade(config, signal) {
    const response = await fetch(config.endpoint, {
        method: 'GET',
        headers: criarHeadersRequisicao(config),
        signal
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data?.telaIndisponibilidadeList?.items;
}

function atualizarMensagemIndisponibilidade(ativo, url) {
    const msgElement = document.getElementById('msg');

    if (ativo === 'true') {
        if (msgElement) {
            msgElement.textContent = '';
            msgElement.appendChild(document.createTextNode('API retornou '));
            const strongTrue = document.createElement('strong');
            strongTrue.textContent = 'true';
            msgElement.appendChild(strongTrue);
            msgElement.appendChild(document.createTextNode('. URL disponível: '));
            const strongUrl = document.createElement('strong');
            strongUrl.textContent = url;
            msgElement.appendChild(strongUrl);
        }
        return;
    }

    if (msgElement) {
        msgElement.textContent = 'API retornou false, navegação normal para o cliente';
    }
}

function aplicarDadosIndisponibilidade(items) {
    if (!items || items.length === 0) {
        return apiData;
    }

    const primeiroItem = items[0];
    apiData.ativo = primeiroItem.ativo;
    apiData.url = primeiroItem.url;

    atualizarMensagemIndisponibilidade(apiData.ativo, apiData.url);
    return apiData;
}

function tratarErroIndisponibilidade(error) {
    if (error.name === 'AbortError') {
        console.warn('Timeout de 4 segundos ao consultar indisponibilidade.');
        return apiData;
    }

    console.error('Erro ao verificar indisponibilidade:', error);
    return apiData;
}

async function verificarIndisponibilidadeComTimeout(timeoutMs = 4000) {
    if (apiRequestPromise) {
        return apiRequestPromise;
    }

    apiRequestPromise = (async () => {
        const config = obterConfigIndisponibilidade();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const items = await buscarDadosIndisponibilidade(config, controller.signal);
            return aplicarDadosIndisponibilidade(items);
        } catch (error) {
            return tratarErroIndisponibilidade(error);
        } finally {
            clearTimeout(timeoutId);
            apiRequestPromise = null;
        }
    })();

    return apiRequestPromise;
}

function reenviarFormulario(form, botao) {
    if (form.dataset) {
        form.dataset.indisponibilidadeBypass = '1';
    }

    if (typeof form.requestSubmit === 'function') {
        try {
            form.requestSubmit(botao);
        } catch (error) {
            form.requestSubmit();
        }
        return;
    }

    HTMLFormElement.prototype.submit.call(form);
}

function continuarFluxoDoClique(botao) {
    const form = botao.closest('form');
    if (form) {
        reenviarFormulario(form, botao);
        return;
    }

    const hrefDestino = botao.getAttribute('data-original-href') || botao.getAttribute('href');
    if (hrefDestino) {
        window.location.href = hrefDestino;
        return;
    }

    // Fallback: dispara clique nativo apenas uma vez
    if (botao.dataset) {
        botao.dataset.indisponibilidadeClickBypass = '1';
    }
    botao.click();
}

async function validarCliqueComIndisponibilidade(e, botao, origem) {
    if (!botao) {
        return true;
    }

    if (botao.dataset && botao.dataset.indisponibilidadeClickBypass === '1') {
        botao.dataset.indisponibilidadeClickBypass = '0';
        return true;
    }

    // Segura clique/navegação até concluir a chamada da API (máx. 4s)
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    await verificarIndisponibilidadeComTimeout(4000);

    if (apiData.ativo === 'true') {
        if (apiData.url) {
            showModal(apiData.url);
        }
        return false;
    }

    continuarFluxoDoClique(botao);
    return true;
}

// Função para criar e exibir o modal
function showModal(url) {
    // Remover modal existente se houver
    const existingModal = document.querySelector('.custom-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Criar overlay do modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // Criar conteúdo do modal
    const modalContent = document.createElement('div');
    modalContent.className = 'custom-modal-content';
    modalContent.style.cssText = `
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 59%;
        height: 75%;
        display: flex;
        flex-direction: column;
    `;

    // Criar container do header do modal
    const modalHeader = document.createElement('div');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    `;

    // Criar botão de fechar
    const closeButton = document.createElement('button');
    // Correção XSS: usar createElementNS para SVG em vez de innerHTML
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M18.3646 18.3643C18.265 18.4636 18.1302 18.5194 17.9896 18.5194C17.849 18.5194 17.7141 18.4636 17.6146 18.3643L12.0001 12.7498L6.38409 18.3643C6.28463 18.4638 6.14974 18.5197 6.00909 18.5197C5.86844 18.5197 5.73355 18.4638 5.63409 18.3643C5.53463 18.2649 5.47876 18.13 5.47876 17.9893C5.47876 17.8487 5.53463 17.7138 5.63409 17.6143L11.2501 11.9998L5.63559 6.38385C5.53613 6.28439 5.48026 6.1495 5.48026 6.00885C5.48026 5.86819 5.53613 5.7333 5.63559 5.63385C5.73505 5.53439 5.86994 5.47852 6.01059 5.47852C6.15124 5.47852 6.28613 5.53439 6.38559 5.63385L12.0001 11.2498L17.6161 5.63385C17.7155 5.53439 17.8504 5.47852 17.9911 5.47852C18.1317 5.47852 18.2666 5.53439 18.3661 5.63385C18.4655 5.7333 18.5214 5.86819 18.5214 6.00885C18.5214 6.1495 18.4655 6.28439 18.3661 6.38385L12.7501 11.9998L18.3661 17.6158C18.4647 17.7155 18.5199 17.8502 18.5196 17.9904C18.5194 18.1306 18.4636 18.2651 18.3646 18.3643Z');
    path.setAttribute('fill', '#CC092F');
    svg.appendChild(path);
    closeButton.appendChild(svg);
    closeButton.style.cssText = `
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    closeButton.addEventListener('click', () => {
        modalOverlay.remove();
    });

    // Criar iframe para carregar o conteúdo da URL
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
        flex: 1;
    `;

    // Fechar modal ao clicar no overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    // Montar o modal
    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(iframe);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// Detectar clique no botão header__submit-button
function initButtonListener() {
    // Interceptar TODOS os clicks no document
    document.addEventListener('click', async (e) => {
        const target = e.target;
        if (!(target instanceof Element)) {
            return;
        }

        // Verificar se o clique foi no botão header__submit-button ou btn-ok ou em elementos filhos deles
        const botao = target.closest('.header__submit-button, .btn-ok');
        if (botao) {
            await validarCliqueComIndisponibilidade(e, botao, 'document');
        }
    }, { capture: true });

    // Interceptar tentativas de navegação
    window.addEventListener('beforeunload', (e) => {
        if (apiData.ativo === 'true') {
            // Nota: beforeunload não pode bloquear navegações programáticas
            // mas serve como log adicional
        }
    });

    // Aguardar o carregamento do botão específico
    const checkButton = setInterval(() => {
        const submitButton = document.querySelector('.header__submit-button');
        if (submitButton) {
            clearInterval(checkButton);

            // Remover possíveis atributos que causam redirect
            if (submitButton.hasAttribute('onclick')) {
                submitButton.removeAttribute('onclick');
            }

            if (submitButton.hasAttribute('href')) {
                const originalHref = submitButton.getAttribute('href');
                submitButton.setAttribute('data-original-href', originalHref);
                submitButton.removeAttribute('href');
            }

            // Adicionar listener direto no botão como camada adicional
            submitButton.addEventListener('click', async (e) => {
                await validarCliqueComIndisponibilidade(e, submitButton, 'botao header__submit-button');
            }, { capture: true });
        }
    }, 100);

    // Timeout de segurança
    setTimeout(() => clearInterval(checkButton), 10000);

    // Aguardar o carregamento do botão .btn-ok
    const checkBtnOk = setInterval(() => {
        const btnOk = document.querySelector('.btn-ok');
        if (btnOk) {
            clearInterval(checkBtnOk);
            // Remover possíveis atributos que causam redirect
            if (btnOk.hasAttribute('onclick')) {
                btnOk.removeAttribute('onclick');
            }

            if (btnOk.hasAttribute('href')) {
                const originalHref = btnOk.getAttribute('href');
                btnOk.setAttribute('data-original-href', originalHref);
                btnOk.removeAttribute('href');
            }

            // Adicionar listener direto no botão como camada adicional
            btnOk.addEventListener('click', async (e) => {
                await validarCliqueComIndisponibilidade(e, btnOk, 'botao .btn-ok');
            }, { capture: true });
        }
    }, 100);

    // Timeout de segurança
    setTimeout(() => clearInterval(checkBtnOk), 10000);
}

// Iniciar listener do botão
initButtonListener();