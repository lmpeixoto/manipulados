import { MatEmbCtrl } from './MatEmbCtrl.js'
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { UICtrl } from './UICtrl.js';
import { Model } from './Model.js';


const OrcamentoCtrl = (function (UICtrl, MatPrimaCtrl, MatEmbCtrl, Model) {

    const loadEventListeners = function () {
        UICtrl.UISelectors.addFormaFarmButton.addEventListener("click", UICtrl.displayFormaFarmaceuticaPrice);
        UICtrl.UISelectors.addMatPrimaButton.addEventListener("click", MatPrimaCtrl.addMatPrima);
        UICtrl.UISelectors.addMatEmbButton.addEventListener("click", MatEmbCtrl.addMatEmb);
        UICtrl.UISelectors.saveButton.addEventListener("click", Model.saveOrcamentoData);
    }

    const fetchData = function () {
        Model.fetchFormasFarmaceuticas().then((result) => UICtrl.formaFarmaceuticaSelectPopulate(result));
        Model.fetchFatores().then((result) => UICtrl.fatorSelectPopulate(result));
    }

    return {

        init: function () {
            loadEventListeners();
            fetchData();
        }
    }


})(UICtrl, MatPrimaCtrl, MatEmbCtrl, Model);

OrcamentoCtrl.init();
