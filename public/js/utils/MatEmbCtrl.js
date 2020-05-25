import { OrcamentoUICtrl } from "../orcamento/OrcamentoUICtrl.js";

export const MatEmbCtrl = (function () {
  const MaterialEmbalagem = function (id, nome, capacidade, preco, qtd) {
    this.id = id;
    this.nome = nome;
    this.capacidade = capacidade;
    this.preco = preco;
    this.qtd = qtd;
  };

  let UIController;

  let materiaisEmbalagem = [];

  let currentId;

  const addMatEmb = () => {
    let id;

    if (currentId) {
      id = currentId;
    } else {
      id = 0;
      currentId = 0;
    }

    let matEmb = new MaterialEmbalagem(
      id,
      UIController.UISelectors.matEmbNome.value,
      UIController.UISelectors.matEmbCapacidade.value,
      UIController.UISelectors.matEmbPreco.value,
      UIController.UISelectors.matEmbQtd.value
    );
    if (validateMatEmb(matEmb)) {
      materiaisEmbalagem.push(matEmb);
      UIController.addMatEmbItem(matEmb);
      UIController.displayMatEmbTotalPrice();
      currentId += 1;
      UIController.displayTotal();
      UIController.deleteMatEmbFields();
    } else {
      alert(
        "Um ou mais campos do material de embalagem estão em falta. Repita por favor!"
      );
    }
  };

  const removeMatEmb = (e) => {
    let elementToRemove = e.target.parentNode;
    let indexToRemove = elementToRemove.id.split("-")[2];
    let matEmbUpdated = materiaisEmbalagem.filter(
      (matEmb) => parseInt(matEmb.id) !== parseInt(indexToRemove)
    );
    materiaisEmbalagem = matEmbUpdated;
    UIController.deleteMatEmbItem(indexToRemove);
    UIController.displayMatEmbTotalPrice();
    UIController.displayTotal();
  };

  const calculateLinePrice = (item) => {
    return +(item.preco * item.qtd).toFixed(2);
  };

  const calculateTotalPrice = () => {
    let valor = 0;

    for (let i = 0; i < materiaisEmbalagem.length; i++) {
      valor += +materiaisEmbalagem[i].preco * +materiaisEmbalagem[i].qtd;
    }

    return +valor.toFixed(2);
  };

  const getMatEmb = () => {
    return materiaisEmbalagem;
  };

  const validateMatEmb = (matEmb) => {
    if (matEmb.id !== null && matEmb.nome && matEmb.capacidade && matEmb.qtd) {
      return true;
    } else {
      return false;
    }
  };

  const setUI = (UI) => (UIController = UI);

  return {
    addMatEmb,
    removeMatEmb,
    calculateLinePrice,
    calculateTotalPrice,
    getMatEmb,
    validateMatEmb,
    setUI,
  };
})();
