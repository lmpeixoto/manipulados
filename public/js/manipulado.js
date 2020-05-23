import { MatEmbCtrl } from './MatEmbCtrl.js'
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { OrcamentoUICtrl } from './OrcamentoUICtrl.js';
import { OrcamentoModel } from './OrcamentoModel.js';
import { ManipuladoUICtrl } from './ManipuladoUICtrl.js';
import { ValidCtrl } from './ValidCtrl.js';


const ManipuladoCtrl = (function (UICtrl, MatPrimaCtrl, MatEmbCtrl, Model) {

    const loadEventListeners = function () {
        OrcamentoUICtrl.UISelectors.addFormaFarmButton.addEventListener("click", UICtrl.displayFormaFarmaceuticaPrice);
        OrcamentoUICtrl.UISelectors.addMatPrimaButton.addEventListener("click", MatPrimaCtrl.addMatPrima);
        OrcamentoUICtrl.UISelectors.addMatEmbButton.addEventListener("click", MatEmbCtrl.addMatEmb);
        ManipuladoUICtrl.UISelectors.addValidacaoButton.addEventListener("click", ValidCtrl.addValidacao)


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


})(OrcamentoUICtrl, MatPrimaCtrl, MatEmbCtrl, OrcamentoModel);

ManipuladoCtrl.init();
