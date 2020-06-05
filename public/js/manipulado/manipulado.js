// @ts-check

import { FormaFarmCtrl } from '../utils/FormaFarmCtrl.js';
import { MatEmbCtrl } from '../utils/MatEmbCtrl.js';
import { MatPrimaCtrl } from '../utils/MatPrimaCtrl.js';
import { ManipuladoUICtrl } from './ManipuladoUICtrl.js';
import { ValidCtrl } from '../utils/ValidCtrl.js';
import { ManipuladoModel } from './ManipuladoModel.js';

const ManipuladoCtrl = (function (
    ManipuladoUICtrl,
    FormaFarmCtrl,
    MatPrimaCtrl,
    MatEmbCtrl
) {
    const loadEventListeners = function () {
        ManipuladoUICtrl.UISelectors.addFormaFarmButton.addEventListener(
            'click',
            ManipuladoUICtrl.addFormaFarmaceutica
        );
        ManipuladoUICtrl.UISelectors.addMatPrimaButton.addEventListener(
            'click',
            MatPrimaCtrl.addMatPrima
        );
        ManipuladoUICtrl.UISelectors.addMatEmbButton.addEventListener(
            'click',
            MatEmbCtrl.addMatEmb
        );
        ManipuladoUICtrl.UISelectors.addValidacaoButton.addEventListener(
            'click',
            ValidCtrl.addValidacao
        );
        ManipuladoUICtrl.UISelectors.saveManipuladoButton.addEventListener(
            'click',
            ManipuladoModel.saveManipuladoData
        );
    };

    const fetchData = function () {
        FormaFarmCtrl.fetchFormasFarmaceuticas().then((result) =>
            ManipuladoUICtrl.formaFarmaceuticaSelectPopulate(result)
        );
        MatPrimaCtrl.fetchFatores().then((result) =>
            ManipuladoUICtrl.fatorSelectPopulate(result)
        );
    };

    return {
        init: function () {
            loadEventListeners();
            fetchData();
            MatPrimaCtrl.setUI(ManipuladoUICtrl);
            MatEmbCtrl.setUI(ManipuladoUICtrl);
        }
    };
})(ManipuladoUICtrl, FormaFarmCtrl, MatPrimaCtrl, MatEmbCtrl);

ManipuladoCtrl.init();
