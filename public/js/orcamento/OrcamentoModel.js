// @ts-check

import { MatEmbCtrl } from '../utils/MatEmbCtrl.js';
import { MatPrimaCtrl } from '../utils/MatPrimaCtrl.js';

export const OrcamentoModel = (function () {
    let fatorF = 4;
    let nomeManipulado;
    let formaFarmaceutica;
    let matPrimasPrice;
    let matEmbPrice;
    let totalPrice;
    let IVA;

    const createObjectToSend = () => {
        let manipulado = {
            nomeManipulado: nomeManipulado,
            fatorF: fatorF,
            fFarmNome: formaFarmaceutica.nome,
            fFarmQtd: formaFarmaceutica.qtd,
            fFarmPreco: formaFarmaceutica.preco,
            materiasPrimas: MatPrimaCtrl.getMatPrimas(),
            materiasPrimasPrice: matPrimasPrice,
            materiaisEmbalagem: MatEmbCtrl.getMatEmb(),
            materiaisEmbalagemPrice: matEmbPrice,
            totalPrice: totalPrice,
            IVA: IVA
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

    const saveOrcamentoData = (e) => {
        e.preventDefault();
        if (validateBeforeSaving()) {
            fetch('/orcamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
        console.log(
            validateFormaFarmaceutica() +
                ' ' +
                validateMateriasPrimas() +
                ' ' +
                validateMateriaisEmb()
        );
        if (
            validateFormaFarmaceutica() &&
            validateMateriasPrimas() &&
            validateMateriaisEmb()
        ) {
            console.log('Validated successfully!');
            return true;
        } else {
            alert('Um ou mais elementos não estão validados. Tente novamente!');
            return false;
        }
    };
    const validateFormaFarmaceutica = () => {
        if (
            nomeManipulado &&
            formaFarmaceutica.nome &&
            formaFarmaceutica.preco &&
            formaFarmaceutica.qtd
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
    const setFormaFarm = (fFarm) => (formaFarmaceutica = fFarm);

    return {
        calculateTotalPrice,
        createObjectToSend,
        saveOrcamentoData,
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
        validateFormaFarmaceutica,
        validateMateriasPrimas,
        validateMateriaisEmb,
        validateBeforeSaving
    };
})();
