const UICtrl = (function () {

  return {

    fetchFormasFarmaceuticas: async () => {
      let response = await fetch("/formasFarmaceuticas");
      let data = await response.json();
      return data;
    },

    fetchFatores: async () => {
      let response = await fetch("/fatores");
      let data = await response.json();
      return data;
    },

    formaFarmaceuticaSelectPopulate: (fFarm) => {
      const formaFarmaceuticaSelect = document.getElementById("select-forma-farmaceutica");
      let formasFarmaceuticas = Object.keys(fFarm);
      formasFarmaceuticas.forEach((ff) => {
        let option = document.createElement("option");
        option.value = ff;
        option.text = ff;
        formaFarmaceuticaSelect.add(option);
      });
    },

    fatorSelectPopulate: (fatores) => {
      const fatorSelect = document.getElementById("select-fator");
      for (let fator in fatores) {
        let option = document.createElement("option");
        option.value = fator;
        option.text = fator;
        fatorSelect.add(option);
      }
    },

    addListItem: (item, element) => {
      let html = `<li class="mat-prima-element" id="mat-prima-${item.id}">${item.nome} - ${item.qtd} - ${item.fator} - ${item.preco}€ <button type="button" class="rem-mat-prima-button"><span class="glyphicon glyphicon-minus"></span>Remover</button>`;
      const matPrimasSummaryList = document.getElementById("mat-primas-summary-list");
      matPrimasSummaryList.innerHTML += html;
      matPrimasSummaryList.addEventListener("click", MatPrimaCtrl.removeMatPrima);
    },

    deleteListItem: (index, element) => {
      const itemID = `${element}${index}`;
      const item = document.querySelector(itemID);
      item.remove();
    }

  };
})();

const MatPrimaCtrl = (function () {

  const MateriaPrima = function (id, nome, preco, qtd, fator) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
    this.fator = fator;
  };

  let materiasPrimas = [];

  return {

    addMatPrima: () => {
      if (materiasPrimas.length === 0) {
        id = 0;
      } else {
        id = materiasPrimas.length;
      }
      let nome = document.getElementById("nome-mat-prim").value;
      let preco = document.getElementById("preco-mat-prim").value;
      let qtd = document.getElementById("qtd-mat-prim").value;
      let fator = document.getElementById("select-fator").value;
      let matPrima = new MateriaPrima(id, nome, preco, qtd, fator);
      materiasPrimas.push(matPrima);
      UICtrl.addListItem(matPrima);
    },

    removeMatPrima: (e) => {
      let elementToRemove = e.target.parentNode;
      console.log(elementToRemove);
      let indexToRemove = elementToRemove.id.split('-')[2];
      let elementIdBase = "#mat - prima -"
      let matPrimaToRemove = materiasPrimas.find(o => o.id === indexToRemove);
      if (matPrimaToRemove) {
        materiasPrimas.elementToRemove(matPrimaToRemove)
      };

      UICtrl.deleteListItem(indexToRemove, elementIdBase)
    }


  };

})();


const MatEmbCtrl = (function () {

  const MaterialEmbalagem = function (id, nome, preco) {

    this.id = id;
    this.nome = nome;
    this.preco = preco;

  };

  let materiaisEmbalagem = [];

  return {

    addMatEmb: () => {
      if (materiaisEmbalagem.length === 0) {
        id = 0;
      } else {
        id = materiaisEmbalagem.length;
      }
      let nome = document.getElementById("nome-mat-emb").value;
      let preco = document.getElementById("preco-mat-emb").value;
      let qtd = document.getElementById("qtd-mat-emb").value;

      let matEmb = new MaterialEmbalagem(id, nome, preco, qtd);
      materiaisEmbalagem.push(matEmb);
      UICtrl.addListItem(matEmb);
    },

    removeMatEmb: (e) => {
      let elementToRemove = e.target.parentNode;
      console.log(elementToRemove);
      let indexToRemove = elementToRemove.id.split('-')[2];
      let matEmbToRemove = materiaisEmbalagem.find(o => o.id === indexToRemove);
      if (matEmbToRemove) {
        materiaisEmbalagem.elementToRemove(matEmbToRemove)
      };
      UICtrl.deleteListItem(indexToRemove)
    }

  }

})()

const AppCtrl = (function (UICtrl, MatPrimaCtrl) {

  const loadEventListeners = function () {
    const addMatPrimaButton = document.getElementById("add-mat-prima-button");
    addMatPrimaButton.addEventListener("click", MatPrimaCtrl.addMatPrima);

  };

  const fetchData = function () {
    let fFarm = UICtrl.fetchFormasFarmaceuticas().then((result) => UICtrl.formaFarmaceuticaSelectPopulate(result));
    UICtrl.formaFarmaceuticaSelectPopulate(fFarm);
    let fatores = UICtrl.fetchFatores().then((result) => UICtrl.fatorSelectPopulate(result));
    UICtrl.fatorSelectPopulate(fatores);
  };

  return {
    init: function () {
      loadEventListeners();
      fetchData();

    },
  };
})(UICtrl, MatPrimaCtrl);

AppCtrl.init();
