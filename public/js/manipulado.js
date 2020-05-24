import { FormaFarmCtrl } from './FormaFarmCtrl.js';
import { MatEmbCtrl } from './MatEmbCtrl.js';
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { OrcamentoUICtrl } from './OrcamentoUICtrl.js';
import { ManipuladoUICtrl } from './ManipuladoUICtrl.js';
import { ValidCtrl } from './ValidCtrl.js';


const ManipuladoCtrl = (function (OrcamentoUICtrl, ManipuladoUICtrl, FormaFarmCtrl, MatPrimaCtrl, MatEmbCtrl) {

    const loadEventListeners = function () {
        OrcamentoUICtrl.UISelectors.addFormaFarmButton.addEventListener("click", OrcamentoUICtrl.displayFormaFarmaceuticaPrice);
        OrcamentoUICtrl.UISelectors.addMatPrimaButton.addEventListener("click", MatPrimaCtrl.addMatPrima);
        OrcamentoUICtrl.UISelectors.addMatEmbButton.addEventListener("click", MatEmbCtrl.addMatEmb);
        ManipuladoUICtrl.UISelectors.addValidacaoButton.addEventListener("click", ValidCtrl.addValidacao)


    }

    const fetchData = function () {
        FormaFarmCtrl.fetchFormasFarmaceuticas().then((result) => OrcamentoUICtrl.formaFarmaceuticaSelectPopulate(result));
        MatPrimaCtrl.fetchFatores().then((result) => OrcamentoUICtrl.fatorSelectPopulate(result));
    }

    return {

        init: function () {
            loadEventListeners();
            fetchData();
        }
    }


})(OrcamentoUICtrl, ManipuladoUICtrl, FormaFarmCtrl, MatPrimaCtrl, MatEmbCtrl);

ManipuladoCtrl.init();
