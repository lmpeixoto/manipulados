import { ValidCtrl } from './ValidCtrl.js'

export const ManipuladoUICtrl = (function () {

    const UISelectors = {
        lote: document.querySelector('.lote-manipulado'),
        preparador: document.querySelector('.preparador-manipulado'),
        supervisor: document.querySelector('.supervisor-manipulado'),
        nomeUtente: document.querySelector('.nome-utente'),
        contactoUtente: document.querySelector('.contacto-utente'),
        nomePrescritor: document.querySelector('.nome-prescritor'),
        contactoPrescritor: document.querySelector('.contacto-prescritor'),
        preparacaoManipulado: document.querySelector('.preparacao-manipulado'),
        conservacao: document.querySelector('.conservacao-manipulado'),
        validade: document.querySelector('.validade-manipulado'),
        ensaioValidacao: document.getElementById('ensaio-validacao'),
        especificacaoValidacao: document.getElementById('especificacao-validacao'),
        resultadoValidacao: document.getElementById('resultado-validacao'),
        addValidacaoButton: document.getElementById('add-validacao-button'),
        validacaoSummaryList: document.getElementById('validacao-summary-list'),
        gravarManipuladoButton: document.getElementById('save-manipulado-button')

    }

    const displayValidacao = (item) => {
        let html = `<li class="validacao-element" id="validacao-${item.id}">
                    ${item.nomeEnsaio} -  ${item.especificacao} - ${item.resultado}  
                      <button type="button" class="rem-validacao-button">
                        <span class="glyphicon glyphicon-minus">
                        </span>Remover
                      </button>`;
        UISelectors.validacaoSummaryList.innerHTML += html;
        UISelectors.validacaoSummaryList.addEventListener("click", ValidCtrl.removeEnsaioValidacao);
    }

    const deleteValidacaoFields = () => {
        UISelectors.ensaioValidacao.value = "";
        UISelectors.especificacaoValidacao.value = "";
        UISelectors.resultadoValidacao.value = "";
    };
    const deleteValidacaoItem = (index) => {
        const itemID = `#validacao-${index}`;
        const item = document.querySelector(itemID);
        item.remove();
    };

    return {
        UISelectors,
        displayValidacao,
        deleteValidacaoFields,
        deleteValidacaoItem

    }

})();