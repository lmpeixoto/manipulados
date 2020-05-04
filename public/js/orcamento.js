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
  };
})();

const ItemCtrl = (function () {

  const MateriaPrima = function (nome, preco, qtd, fator) {
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
    this.fator = fator;
  };

  const materiasPrimas = [];

  return {

    addMatPrima: () => {
      nome = document.getElementById("nome-mat-prim").value;
      preco = document.getElementById("preco-mat-prim").value;
      qtd = document.getElementById("qtd-mat-prim").value;
      fator = document.getElementById("select-fator").value;

      matPrima = new MateriaPrima(nome, preco, qtd, fator);
      materiasPrimas.push(matPrima);
      index = materiasPrimas.indexOf(matPrima);
      console.log(matPrima);
      let html = `<li>${matPrima.nome} <button type="button" class="rem-mat-prima-button" id="mat-prima-element-${index}><span class="glyphicon glyphicon-minus"></span>Remover</button>`;
      const matPrimasSummaryList = document.getElementById("mat-primas-summary-list");
      matPrimasSummaryList.innerHTML = html;
      const removeMatPrimaButton = document.querySelector(".rem-mat-prima-button");
      removeMatPrimaButton.addEventListener("click", ItemCtrl.removeMatPrima);
    },

    removeMatPrima: () => {

    },
  };
})();

const AppCtrl = (function (UICtrl, ItemCtrl) {

  const loadEventListeners = function () {
    const addMatPrimaButton = document.getElementById("add-mat-prima-button");
    addMatPrimaButton.addEventListener("click", ItemCtrl.addMatPrima);
  };

  const fetchData = function () {
    let fFarm = UICtrl.fetchFormasFarmaceuticas().then((result) => UICtrl.formaFarmaceuticaSelectPopulate(result));
    UICtrl.formaFarmaceuticaSelectPopulate(fFarm);
    let fatores = UICtrl.fetchFatores().then((result) => UICtrl.fatorSelectPopulate(result));
    UICtrl.fatorSelectPopulate(fatores);
  };

  return {
    init: function () {
      fetchData();
      loadEventListeners();
    },
  };
})(UICtrl, ItemCtrl);

AppCtrl.init();
