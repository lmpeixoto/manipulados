// @ts-check

import { FormaFarmCtrl } from '../utils/FormaFarmCtrl.js';
import { MatEmbCtrl } from '../utils/MatEmbCtrl.js';
import { MatPrimaCtrl } from '../utils/MatPrimaCtrl.js';
import { EditManipuladoUICtrl } from './EditManipuladoUICtrl.js';
import { ValidCtrl } from '../utils/ValidCtrl.js';
import { EditManipuladoModel } from './EditManipuladoModel.js';

const EditManipuladoCtrl = (function (
    EditManipuladoUICtrl,
    FormaFarmCtrl,
    MatPrimaCtrl,
    MatEmbCtrl,
    ValidCtrl,
    EditManipuladoModel
) {
    const getDataFromAutomaticallyFilledDOMObjects = () => {
        ValidCtrl.setEnsaiosValidacao(getDataFromMatEmb());
        MatPrimaCtrl.setMateriasPrimas(getDataFromMatPrim());
        MatEmbCtrl.setMateriaisEmbalagem(getDataFromValid());
        addEventListenersToAutomaticallyFilledDOMObjects();
        setManipuladoPrices();
    };

    function setManipuladoPrices() {
        EditManipuladoModel.setFormaFarm(getDataFromFormaFarm());
        EditManipuladoModel.setMatPrimasPrice(
            +EditManipuladoUICtrl.UISelectors.matPrimaTotalPrice.textContent
        );
        EditManipuladoModel.setMatEmbPrice(
            +EditManipuladoUICtrl.UISelectors.matEmbTotalPrice.textContent
        );
        EditManipuladoModel.setIVA(
            +EditManipuladoUICtrl.UISelectors.ivaTotalPrice.textContent
        );
        EditManipuladoModel.setTotalPrice(
            +EditManipuladoUICtrl.UISelectors.totalTotalPrice.textContent
        );
    }

    function addEventListenersToAutomaticallyFilledDOMObjects() {
        EditManipuladoUICtrl.UISelectors.removeMatPrimaButton.addEventListener(
            'click',
            MatPrimaCtrl.removeMatPrima
        );
        EditManipuladoUICtrl.UISelectors.removeMatEmbButton.addEventListener(
            'click',
            MatEmbCtrl.removeMatEmb
        );
        EditManipuladoUICtrl.UISelectors.removeValidButton.addEventListener(
            'click',
            ValidCtrl.removeEnsaioValidacao
        );
    }

    function getDataFromFormaFarm() {
        let nome = EditManipuladoUICtrl.UISelectors.formaFarmNome.value;
        let qtd = EditManipuladoUICtrl.UISelectors.formaFarmQtd.value;
        let preco = +EditManipuladoUICtrl.UISelectors.formFarmTotalPrice
            .textContent;
        let fFarm = new FormaFarmCtrl.FormaFarmaceutica(nome, qtd, preco);
        return fFarm;
    }

    function getDataFromMatPrim() {
        let matPrimChildList =
            EditManipuladoUICtrl.UISelectors.matPrimasSummaryList.children;
        let materiasPrimas = [];
        for (let i = 0; i < matPrimChildList.length; i++) {
            let text = matPrimChildList[i].innerText.split(' ');
            let id = matPrimChildList[i].id.split('-')[2];
            let nome = text[0];
            let capacidade = text[2];
            let preco = text[4];
            let qtd = text[6];
            let valor = text[9].split('€')[0];
            let matEmb = new MatPrimaCtrl.MateriaPrima(
                id,
                nome,
                capacidade,
                preco,
                qtd,
                valor
            );
            materiasPrimas.push(matEmb);
        }
        return materiasPrimas;
    }

    function getDataFromMatEmb() {
        let validChildList =
            EditManipuladoUICtrl.UISelectors.matEmbSummaryList.children;
        let materiaisEmbalagem = [];
        for (let i = 0; i < validChildList.length; i++) {
            let text = validChildList[i].innerText.split(' ');
            let id = validChildList[i].id.split('-')[2];
            let nome = text[0];
            let capacidade = text[2];
            let preco = text[4];
            let qtd = text[6];
            let valor = text[9].split('€')[0];
            let matEmb = new MatEmbCtrl.MaterialEmbalagem(
                id,
                nome,
                capacidade,
                preco,
                qtd,
                valor
            );
            materiaisEmbalagem.push(matEmb);
        }
        return materiaisEmbalagem;
    }

    function getDataFromValid() {
        let validChildList =
            EditManipuladoUICtrl.UISelectors.validacaoSummaryList.children;
        let validacoes = [];
        for (let i = 0; i < validChildList.length; i++) {
            let text = validChildList[i].innerText.split(' ');
            let id = validChildList[i].id.split('-')[1];
            let ensaio = text[0];
            let especificacao = text[2];
            let resultado = text[4];
            let matEmb = new ValidCtrl.Validacao(
                id,
                ensaio,
                especificacao,
                resultado
            );
            validacoes.push(matEmb);
        }
        return validacoes;
    }

    const loadEventListeners = function () {
        EditManipuladoUICtrl.UISelectors.addFormaFarmButton.addEventListener(
            'click',
            EditManipuladoUICtrl.addFormaFarmaceutica
        );
        EditManipuladoUICtrl.UISelectors.addMatPrimaButton.addEventListener(
            'click',
            MatPrimaCtrl.addMatPrima
        );
        EditManipuladoUICtrl.UISelectors.addMatEmbButton.addEventListener(
            'click',
            MatEmbCtrl.addMatEmb
        );
        EditManipuladoUICtrl.UISelectors.addValidacaoButton.addEventListener(
            'click',
            ValidCtrl.addValidacao
        );
        EditManipuladoUICtrl.UISelectors.saveManipuladoButton.addEventListener(
            'click',
            EditManipuladoModel.saveManipuladoData
        );
    };

    const fetchData = function () {
        FormaFarmCtrl.fetchFormasFarmaceuticas().then((result) =>
            EditManipuladoUICtrl.formaFarmaceuticaSelectPopulate(result)
        );
        MatPrimaCtrl.fetchFatores().then((result) =>
            EditManipuladoUICtrl.fatorSelectPopulate(result)
        );
    };

    return {
        init: function () {
            getDataFromAutomaticallyFilledDOMObjects();
            loadEventListeners();
            fetchData();
            MatPrimaCtrl.setUI(EditManipuladoUICtrl);
            MatEmbCtrl.setUI(EditManipuladoUICtrl);
        }
    };
})(
    EditManipuladoUICtrl,
    FormaFarmCtrl,
    MatPrimaCtrl,
    MatEmbCtrl,
    ValidCtrl,
    EditManipuladoModel
);

EditManipuladoCtrl.init();
