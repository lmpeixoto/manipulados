import { MatEmbCtrl } from './MatEmbCtrl.js'
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { OrcamentoUICtrl } from './OrcamentoUICtrl.js';
import { OrcamentoModel } from './OrcamentoModel.js';
import { FormaFarmCtrl } from './FormaFarmCtrl.js';


const OrcamentoCtrl = (function (UICtrl, FormaFarmCtrl, MatPrimaCtrl, MatEmbCtrl, Model) {

    const loadEventListeners = function () {
        UICtrl.UISelectors.addFormaFarmButton.addEventListener("click", UICtrl.displayFormaFarmaceuticaPrice);
        UICtrl.UISelectors.addMatPrimaButton.addEventListener("click", MatPrimaCtrl.addMatPrima);
        UICtrl.UISelectors.addMatEmbButton.addEventListener("click", MatEmbCtrl.addMatEmb);
        UICtrl.UISelectors.saveButton.addEventListener("click", Model.saveOrcamentoData);
    }

    const fetchData = function () {
        FormaFarmCtrl.fetchFormasFarmaceuticas().then((result) => UICtrl.formaFarmaceuticaSelectPopulate(result));
        MatPrimaCtrl.fetchFatores().then((result) => UICtrl.fatorSelectPopulate(result));
    }

    return {

        init: function () {
            loadEventListeners();
            fetchData();
        }
    }


})(OrcamentoUICtrl, FormaFarmCtrl, MatPrimaCtrl, MatEmbCtrl, OrcamentoModel);

OrcamentoCtrl.init();
