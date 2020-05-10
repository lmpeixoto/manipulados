const Model = (function () {

  let fFarmPrice;
  let matPrimasPrice;
  let matEmbPrice;
  let totalPrice;
  let IVA;

  const fetchFatores = async () => {
    let response = await fetch("/fatores");
    let data = await response.json();
    return data;
  }

  const fetchFormasFarmaceuticas = async () => {
    let response = await fetch("/formasFarmaceuticas");
    let data = await response.json();
    return data;
  }

  const calculateFormaFarmaceutica = (formasFarmaceuticas) => {
    let formaFarmaceuticaPrice;
    const fFarm = document.getElementById("select-forma-farmaceutica").value;
    const qtd = document.querySelector('.forma-farm-qtd').value;
    const limite = parseInt(formasFarmaceuticas[fFarm][0]);
    const fatorNormal = parseFloat(formasFarmaceuticas[fFarm][1]);
    const fatorSuplemento = parseFloat(formasFarmaceuticas[fFarm][2]);

    if (qtd <= limite) {
      formaFarmaceuticaPrice = fatorNormal * qtd;
    } else {
      let excesso = qtd - limite;
      formaFarmaceuticaPrice = (fatorNormal * limite) + (excesso * fatorSuplemento);
    }

    setfFarmPrice(parseFloat(formaFarmaceuticaPrice));
    return formaFarmaceuticaPrice;
  }

  const calculateTotalPrice = () => {
    let fFarmPrice = (getfFarmPrice() || 0);
    let matPrimPrice = (getMatPrimasPrice() || 0);
    let matEmbPrice = (getMatEmbPrice() || 0);
    let totalPrice = (fFarmPrice + matPrimPrice + matEmbPrice) * 1.3;
    let IVA = totalPrice * 0.023;
    let finalPrice = totalPrice + IVA;
    setTotalPrice(finalPrice);
    setIVA(IVA);
    return [finalPrice, IVA];
  }

  const getfFarmPrice = () => fFarmPrice;

  const getMatPrimasPrice = () => matPrimasPrice;

  const getMatEmbPrice = () => matEmbPrice;

  const getTotalPrice = () => totalPrice;

  const getIVA = () => IVA;

  const setfFarmPrice = (price) => fFarmPrice = price;

  const setMatPrimasPrice = (price) => matPrimasPrice = price;

  const setMatEmbPrice = (price) => matEmbPrice = price;

  const setIVA = (value) => IVA = value;

  const setTotalPrice = (price) => totalPrice = price

  return {

    fetchFormasFarmaceuticas,

    calculateFormaFarmaceutica,

    calculateTotalPrice,

    fetchFatores,

    getfFarmPrice,

    getMatPrimasPrice,

    getMatEmbPrice,

    getTotalPrice,

    getIVA,

    setfFarmPrice,

    setMatPrimasPrice,

    setMatEmbPrice,

    setIVA,

    setTotalPrice
  }

})();



const UICtrl = (function () {

  const formaFarmaceuticaSelectPopulate = (fFarm) => {
    const formaFarmaceuticaSelect = document.getElementById("select-forma-farmaceutica");
    let formasFarmaceuticas = Object.keys(fFarm);
    formasFarmaceuticas.forEach((ff) => {
      let option = document.createElement("option");
      option.value = ff;
      option.text = ff;
      formaFarmaceuticaSelect.add(option);
    });
  }

  const fatorSelectPopulate = (fatores) => {
    const fatorSelect = document.getElementById("select-fator");
    for (let fator in fatores) {
      let option = document.createElement("option");
      option.value = fator;
      option.text = fator;
      fatorSelect.add(option);
    }
  }

  const addMatPrimaItem = (item, fct) => {
    let precoLinha = MatPrimaCtrl.calculateLinePrice(item, fct);
    let html = `<li class="mat-prima-element" id="mat-prima-${item.id}">
                      ${item.nome} - ${item.qtd} - ${item.fator} - ${item.preco}€ - Valor: ${precoLinha}€   
                          <button type="button" class="rem-mat-prima-button">
                                <span class="glyphicon glyphicon-minus">
                                </span>Remover
                          </button>`;
    const matPrimasSummaryList = document.getElementById("mat-primas-summary-list");
    matPrimasSummaryList.innerHTML += html;
    matPrimasSummaryList.addEventListener("click", MatPrimaCtrl.removeMatPrima);
  }

  const deleteMatPrimaItem = (index) => {
    const itemID = `#mat-prima-${index}`;
    const item = document.querySelector(itemID);
    item.remove();
  }

  const displayMatPrimaTotalPrice = (fct) => {
    let totalPrice = MatPrimaCtrl.calculateTotalPrice(fct);
    const matPrimaTotalPrice = document.querySelector('.mat-prima-total-price');
    matPrimaTotalPrice.innerHTML = totalPrice;
    Model.setMatPrimasPrice(parseFloat(totalPrice));
  }

  const addMatEmbItem = (item) => {
    let precoLinha = MatEmbCtrl.calculateLinePrice(item);
    let html = `<li class="mat-emb-element" id="mat-emb-${item.id}">
                    ${item.nome} - ${item.qtd} - ${item.preco}€ - Valor: ${precoLinha}€  
                      <button type="button" class="rem-mat-emb-button">
                        <span class="glyphicon glyphicon-minus">
                        </span>Remover
                      </button>`;
    const matEmbSummaryList = document.getElementById("mat-emb-summary-list");
    matEmbSummaryList.innerHTML += html;
    matEmbSummaryList.addEventListener("click", MatEmbCtrl.removeMatEmb);
  }

  const deleteMatEmbItem = (index) => {
    const itemID = `#mat-emb-${index}`;
    const item = document.querySelector(itemID);
    item.remove();
  }

  const displayMatEmbTotalPrice = () => {
    let totalPrice = MatEmbCtrl.calculateTotalPrice() * 1.2;
    const matEmbTotalPrice = document.querySelector('.mat-emb-total-price');
    matEmbTotalPrice.innerHTML = totalPrice;
    Model.setMatEmbPrice(parseFloat(totalPrice));
  }

  const displayFormaFarmaceuticaPrice = () => {
    const formFarmTotalPrice = document.querySelector('.forma-farm-total-price');
    Model.fetchFormasFarmaceuticas().then(ff => {
      let price = Model.calculateFormaFarmaceutica(ff);
      formFarmTotalPrice.innerHTML = price;
      Model.setfFarmPrice(price);
      displayTotal();
    })
  }

  const displayTotal = () => {
    let [total, iva] = Model.calculateTotalPrice();
    const totalTotalPrice = document.querySelector('.total-total-price');
    totalTotalPrice.innerHTML = total;
    const ivaTotalPrice = document.querySelector('.iva-total-price');
    ivaTotalPrice.innerHTML = iva;
  }

  return {

    formaFarmaceuticaSelectPopulate,

    fatorSelectPopulate,

    addMatPrimaItem,

    deleteMatPrimaItem,

    displayMatPrimaTotalPrice,

    addMatEmbItem,

    deleteMatEmbItem,

    displayMatEmbTotalPrice,

    displayTotal,

    displayFormaFarmaceuticaPrice

  }
})();

const MatPrimaCtrl = (function () {

  const MateriaPrima = function (id, nome, preco, qtd, fator) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
    this.fator = fator;
  }

  let currentId;

  let materiasPrimas = [];

  const getMatPrimas = () => {
    return materiasPrimas
  }

  const addMatPrima = () => {
    if (currentId) {
      id = currentId;
    } else {
      id = 0;
      currentId = 0;
    }
    let nome = document.getElementById("nome-mat-prim").value;
    let preco = document.getElementById("preco-mat-prim").value;
    let qtd = document.getElementById("qtd-mat-prim").value;
    let fator = document.getElementById("select-fator").value;
    let matPrima = new MateriaPrima(id, nome, preco, qtd, fator);
    materiasPrimas.push(matPrima);
    Model.fetchFatores().then(fct => UICtrl.addMatPrimaItem(matPrima, fct));
    Model.fetchFatores().then(fct => {
      UICtrl.displayMatPrimaTotalPrice(fct);
      UICtrl.displayTotal()
    });
    currentId += 1;
  }

  const removeMatPrima = (e) => {
    let elementToRemove = e.target.parentNode;
    let indexToRemove = elementToRemove.id.split('-')[2];
    let materiasPrimasUpdated = materiasPrimas.filter(
      matPrim => parseInt(matPrim.id) !== parseInt(indexToRemove));
    materiasPrimas = materiasPrimasUpdated
    UICtrl.deleteMatPrimaItem(indexToRemove)
    Model.fetchFatores().then(fct => {
      UICtrl.displayMatPrimaTotalPrice(fct)
      UICtrl.displayTotal()
    });
  }

  const calculateLinePrice = (item, fct) => {
    return (item.preco * item.qtd * fct[item.fator][1])
  }

  const calculateTotalPrice = (fct) => {
    let valor = 0;

    for (let i = 0; i < materiasPrimas.length; i++) {
      valor += parseInt(materiasPrimas[i].preco) * parseInt(materiasPrimas[i].qtd) * parseFloat((fct[materiasPrimas[i].fator][1]))
    }

    return valor
  }

  return {

    getMatPrimas,

    addMatPrima,

    removeMatPrima,

    calculateLinePrice,

    calculateTotalPrice
  };
})();

const MatEmbCtrl = (function () {

  const MaterialEmbalagem = function (id, nome, preco, qtd) {

    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
  }

  let materiaisEmbalagem = [];

  let currentId;

  const addMatEmb = () => {

    if (currentId) {
      id = currentId;
    } else {
      id = 0;
      currentId = 0;
    }

    let nome = document.getElementById("nome-mat-emb").value;
    let preco = document.getElementById("preco-mat-emb").value;
    let qtd = document.getElementById("qtd-mat-emb").value;
    let matEmb = new MaterialEmbalagem(id, nome, preco, qtd);
    materiaisEmbalagem.push(matEmb);
    UICtrl.addMatEmbItem(matEmb);
    UICtrl.displayMatEmbTotalPrice();
    currentId += 1;
    UICtrl.displayTotal()
  }

  const removeMatEmb = (e) => {
    let elementToRemove = e.target.parentNode;
    let indexToRemove = elementToRemove.id.split('-')[2];
    let matEmbUpdated = materiaisEmbalagem.filter(
      matEmb => parseInt(matEmb.id) !== parseInt(indexToRemove));
    materiaisEmbalagem = matEmbUpdated
    UICtrl.deleteMatEmbItem(indexToRemove);
    UICtrl.displayMatEmbTotalPrice();
    UICtrl.displayTotal()
  }

  const calculateLinePrice = (item) => {
    return item.preco * item.qtd;
  }

  const calculateTotalPrice = () => {
    let valor = 0;

    for (let i = 0; i < materiaisEmbalagem.length; i++) {
      valor += parseInt(materiaisEmbalagem[i].preco) * parseInt(materiaisEmbalagem[i].qtd);
    }

    return valor
  }

  return {

    addMatEmb,

    removeMatEmb,

    calculateLinePrice,

    calculateTotalPrice

  }

})()

const AppCtrl = (function (UICtrl, MatPrimaCtrl, MatEmbCtrl, Model) {

  const loadEventListeners = function () {
    const addFormaFarmButton = document.querySelector(".add-forma-farm-button");
    addFormaFarmButton.addEventListener("click", UICtrl.displayFormaFarmaceuticaPrice);
    const addMatPrimaButton = document.getElementById("add-mat-prima-button");
    addMatPrimaButton.addEventListener("click", MatPrimaCtrl.addMatPrima);
    const addMatEmbButton = document.getElementById("add-mat-emb-button");
    addMatEmbButton.addEventListener("click", MatEmbCtrl.addMatEmb);
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

AppCtrl.init();
