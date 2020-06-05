// @ts-check

import { MatEmbCtrl } from '../utils/MatEmbCtrl.js';
import { MatPrimaCtrl } from '../utils/MatPrimaCtrl.js';
import { EditManipuladoUICtrl } from './EditManipuladoUICtrl.js';
import { ValidCtrl } from '../utils/ValidCtrl.js';

export const EditManipuladoModel = (function () {
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
    const saveManipuladoData = (e) => {
        e.preventDefault();
        console.log(createObjectToSend());
        if (validateBeforeSaving()) {
            fetch('/novoManipulado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createObjectToSend())
            }).then((response) => {
                console.log(response);
            });
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
    const setLote = () => (lote = EditManipuladoUICtrl.UISelectors.lote.value);
    const setUtente = () => {
        utenteNome = EditManipuladoUICtrl.UISelectors.nomeUtente.value;
        utenteContacto = EditManipuladoUICtrl.UISelectors.contactoUtente.value;
    };
    const setPrescritor = () => {
        prescritorNome = EditManipuladoUICtrl.UISelectors.nomePrescritor.value;
        prescritorContacto =
            EditManipuladoUICtrl.UISelectors.contactoPrescritor.value;
    };
    const setFarmaceutico = () => {
        farmaceuticoNome = EditManipuladoUICtrl.UISelectors.preparador.value;
        farmaceuticoSupervisor =
            EditManipuladoUICtrl.UISelectors.supervisor.value;
    };
    const setPreparacao = () =>
        (preparacao =
            EditManipuladoUICtrl.UISelectors.preparacaoManipulado.value);
    const setConservacao = () =>
        (conservacao = EditManipuladoUICtrl.UISelectors.conservacao.value);
    const setValidade = () =>
        (validade = EditManipuladoUICtrl.UISelectors.validade.value);

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
