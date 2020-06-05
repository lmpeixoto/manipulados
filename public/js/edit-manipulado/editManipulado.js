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
