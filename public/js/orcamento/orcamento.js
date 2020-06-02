// @ts-check

import { MatEmbCtrl } from "../utils/MatEmbCtrl.js";
import { MatPrimaCtrl } from "../utils/MatPrimaCtrl.js";
import { OrcamentoUICtrl } from "./OrcamentoUICtrl.js";
import { OrcamentoModel } from "./OrcamentoModel.js";
import { FormaFarmCtrl } from "../utils/FormaFarmCtrl.js";

const OrcamentoCtrl = (function (
  OrcamentoUICtrl,
  FormaFarmCtrl,
  MatPrimaCtrl,
  MatEmbCtrl,
  Model
) {
  const loadEventListeners = function () {
    OrcamentoUICtrl.UISelectors.addFormaFarmButton.addEventListener(
      "click",
      OrcamentoUICtrl.addFormaFarmaceutica
    );
    OrcamentoUICtrl.UISelectors.addMatPrimaButton.addEventListener(
      "click",
      MatPrimaCtrl.addMatPrima
    );
    OrcamentoUICtrl.UISelectors.addMatEmbButton.addEventListener(
      "click",
      MatEmbCtrl.addMatEmb
    );
    OrcamentoUICtrl.UISelectors.saveButton.addEventListener(
      "click",
      Model.saveOrcamentoData
    );
  };

  const fetchData = function () {
    FormaFarmCtrl.fetchFormasFarmaceuticas().then((result) =>
      OrcamentoUICtrl.formaFarmaceuticaSelectPopulate(result)
    );
    MatPrimaCtrl.fetchFatores().then((result) =>
      OrcamentoUICtrl.fatorSelectPopulate(result)
    );
  };

  return {
    init: function () {
      loadEventListeners();
      fetchData();
      MatPrimaCtrl.setUI(OrcamentoUICtrl);
      MatEmbCtrl.setUI(OrcamentoUICtrl);
    },
  };
})(OrcamentoUICtrl, FormaFarmCtrl, MatPrimaCtrl, MatEmbCtrl, OrcamentoModel);

OrcamentoCtrl.init();
