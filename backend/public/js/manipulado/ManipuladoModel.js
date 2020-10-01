// @ts-check

import { MatEmbCtrl } from '../utils/MatEmbCtrl.js';
import { MatPrimaCtrl } from '../utils/MatPrimaCtrl.js';
import { ManipuladoUICtrl } from './ManipuladoUICtrl.js';
import { ValidCtrl } from '../utils/ValidCtrl.js';

export const ManipuladoModel = (function () {
    let lote;
    let fatorF = 4;
    let nomeManipulado;
    let matPrimasPrice;
    let matEmbPrice;
    let totalPrice;
    let IVA;
    let formaFarmaceutica;
    let utenteNome;
    let utenteContacto;
    let prescritorNome;
    let prescritorContacto;
    let farmaceuticoNome;
    let farmaceuticoSupervisor;
    let preparacao;
    let conservacao;
    let validade;

    const assignAllFieldsData = () => {
        setLote();
        setUtente();
        setPrescritor();
        setFarmaceutico();
        setPreparacao();
        setConservacao();
        setValidade();
    };
    const createObjectToSend = () => {
        assignAllFieldsData();
        let manipulado = {
            lote: lote,
            nomeManipulado: nomeManipulado,
            fatorF: fatorF,
            utenteNome: utenteNome,
            utenteContacto: utenteContacto,
            prescritorNome: prescritorNome,
            prescritorContacto: prescritorContacto,
            farmaceuticoNome: farmaceuticoNome,
            farmaceuticoSupervisor: farmaceuticoSupervisor,
            fFarmNome: formaFarmaceutica.nome,
            fFarmPrice: formaFarmaceutica.preco,
            fFarmQtd: formaFarmaceutica.qtd,
            materiasPrimas: MatPrimaCtrl.getMatPrimas(),
            materiasPrimasPrice: matPrimasPrice,
            materiaisEmbalagem: MatEmbCtrl.getMatEmb(),
            materiaisEmbalagemPrice: matEmbPrice,
            preparacao: preparacao,
            conservacao: conservacao,
            validade: validade,
            validacoes: ValidCtrl.getEnsaiosValidacao(),
            IVA: IVA,
            totalPrice: totalPrice
        };
        return manipulado;
    };

    const displayMessages = (messages) => {
        const messagesContainer = document.querySelector('.user-messages');
        messagesContainer.classList.remove('hide');
        let html;
        if (messages === '') {
            html = `<div class="user-message user-message--success">
                            Manipulado criado com sucesso!
                        </div>`;
            messagesContainer.innerHTML += html;
        } else {
            messages.forEach((message) => {
                html = `<div class="user-message user-message--error">
                                ${message}
                            </div>`;
                messagesContainer.innerHTML += html;
            });
        }

        setTimeout(clearAllMessages, 5000);
    };

    const clearAllMessages = () => {
        const messageBoxes = document.querySelectorAll('.user-message');
        messageBoxes.forEach((box) => (box.style.display = 'none'));
    };

    const saveManipuladoData = (e) => {
        e.preventDefault();
        console.log(createObjectToSend());
        if (validateBeforeSaving()) {
            let token = document.querySelector('#csrf').value;
            fetch('/novoManipulado', {
                method: 'POST',
                credentials: 'same-origin', // <-- includes cookies in the request
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': token
                },
                redirect: 'follow',
                body: JSON.stringify(createObjectToSend())
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    displayMessages(data.errorMessages);
                })
                .catch((err) => console.log(err));
        } else {
            console.log('Data not saved!');
        }
    };
    const validateBeforeSaving = () => {
        if (
            validateManipulado() &&
            validateMateriasPrimas() &&
            validateMateriaisEmb() &&
            validateValidacoes()
        ) {
            console.log('Validated successfully!');
            return true;
        } else {
            alert('Um ou mais elementos não estão validados. Tente novamente!');
            return false;
        }
    };

    const validateManipulado = () => {
        if (
            nomeManipulado &&
            formaFarmaceutica.nome &&
            formaFarmaceutica.preco &&
            formaFarmaceutica.qtd &&
            lote &&
            utenteNome &&
            utenteContacto &&
            prescritorNome &&
            prescritorContacto &&
            farmaceuticoNome &&
            farmaceuticoSupervisor &&
            preparacao &&
            conservacao &&
            validade
        ) {
            return true;
        }
    };
    const validateMateriasPrimas = () => {
        if (MatPrimaCtrl.getMatPrimas().length > 0) {
            return true;
        }
    };
    const validateMateriaisEmb = () => {
        if (MatEmbCtrl.getMatEmb().length > 0) {
            return true;
        }
    };
    const validateValidacoes = () => {
        if (ValidCtrl.getEnsaiosValidacao().length > 0) {
            return true;
        }
    };

    const calculateTotalPrice = () => {
        let fFarmPrice = getFormaFarmaceuticaPreco() || 0;
        let matPrimPrice = getMatPrimasPrice() || 0;
        let matEmbPrice = getMatEmbPrice() || 0;
        let totalPrice = (fFarmPrice + matPrimPrice + matEmbPrice) * 1.3;
        let IVA = +(totalPrice * 0.023).toFixed(2);
        let finalPrice = +(totalPrice + IVA).toFixed(2);
        setTotalPrice(finalPrice);
        setIVA(IVA);
        return [finalPrice, IVA];
    };

    const getFormaFarmaceutica = () => formaFarmaceutica;
    const getFormaFarmaceuticaPreco = () => {
        if (formaFarmaceutica) {
            return formaFarmaceutica.preco;
        }
    };
    const getMatPrimasPrice = () => matPrimasPrice;
    const getMatEmbPrice = () => matEmbPrice;
    const getTotalPrice = () => totalPrice;
    const getIVA = () => IVA;
    const getFatorF = () => fatorF;
    const setNomeManipulado = (nome) => (nomeManipulado = nome);
    const setMatPrimasPrice = (price) => (matPrimasPrice = price);
    const setMatEmbPrice = (price) => (matEmbPrice = price);
    const setIVA = (value) => (IVA = value);
    const setTotalPrice = (price) => (totalPrice = price);
    const setFormaFarm = (fFarm) => {
        formaFarmaceutica = fFarm;
    };
    const setLote = () => (lote = ManipuladoUICtrl.UISelectors.lote.value);
    const setUtente = () => {
        utenteNome = ManipuladoUICtrl.UISelectors.nomeUtente.value;
        utenteContacto = ManipuladoUICtrl.UISelectors.contactoUtente.value;
    };
    const setPrescritor = () => {
        prescritorNome = ManipuladoUICtrl.UISelectors.nomePrescritor.value;
        prescritorContacto =
            ManipuladoUICtrl.UISelectors.contactoPrescritor.value;
    };
    const setFarmaceutico = () => {
        farmaceuticoNome = ManipuladoUICtrl.UISelectors.preparador.value;
        farmaceuticoSupervisor = ManipuladoUICtrl.UISelectors.supervisor.value;
    };
    const setPreparacao = () =>
        (preparacao = ManipuladoUICtrl.UISelectors.preparacaoManipulado.value);
    const setConservacao = () =>
        (conservacao = ManipuladoUICtrl.UISelectors.conservacao.value);
    const setValidade = () =>
        (validade = ManipuladoUICtrl.UISelectors.validade.value);

    return {
        assignAllFieldsData,
        calculateTotalPrice,
        createObjectToSend,
        saveManipuladoData,
        getFormaFarmaceutica,
        getFormaFarmaceuticaPreco,
        getMatPrimasPrice,
        getMatEmbPrice,
        getTotalPrice,
        getIVA,
        getFatorF,
        setMatPrimasPrice,
        setMatEmbPrice,
        setIVA,
        setTotalPrice,
        setNomeManipulado,
        setFormaFarm,
        setLote,
        setUtente,
        setPrescritor,
        setFarmaceutico,
        setPreparacao,
        setConservacao,
        setValidade,
        validateManipulado,
        validateMateriasPrimas,
        validateMateriaisEmb,
        validateBeforeSaving
    };
})();
