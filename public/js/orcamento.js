


const Model = (function () {

  let fatorF = 4;
  let nomeManipulado;
  let fFarmNome;
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
    const fFarm = UICtrl.UISelectors.formaFarmNome.value;
    const qtd = UICtrl.UISelectors.formaFarmQtd.value;
    const limite = +(formasFarmaceuticas[fFarm][0]);
    const fatorNormal = +(formasFarmaceuticas[fFarm][1]);
    const fatorSuplemento = +(formasFarmaceuticas[fFarm][2]);

    if (qtd <= limite) {
      formaFarmaceuticaPrice = fatorF * fatorNormal;
    } else {
      let excesso = qtd - limite;
      formaFarmaceuticaPrice = (fatorF * fatorNormal) + (excesso * fatorSuplemento);
    }

    formaFarmaceuticaPrice = +(formaFarmaceuticaPrice.toFixed(2));
    setfFarmPrice(formaFarmaceuticaPrice);
    return formaFarmaceuticaPrice;
  }

  const calculateTotalPrice = () => {
    let fFarmPrice = (getfFarmPrice() || 0);
    let matPrimPrice = (getMatPrimasPrice() || 0);
    let matEmbPrice = (getMatEmbPrice() || 0);
    let totalPrice = (fFarmPrice + matPrimPrice + matEmbPrice) * 1.3;
    let IVA = +((totalPrice * 0.023).toFixed(2));
    let finalPrice = +((totalPrice + IVA).toFixed(2));
    setTotalPrice(finalPrice);
    setIVA(IVA);
    return [finalPrice, IVA];
  }


  const createObjectToSend = () => {
    let manipulado = {
      "nomeManipulado": nomeManipulado,
      "fatorF": fatorF,
      "fFarmNome": fFarmNome,
      "fFarmPrice": fFarmPrice,
      "matPrimasPrice": matPrimasPrice,
      "matEmbPrice": matEmbPrice,
      "totalPrice": totalPrice,
      "IVA": IVA,
      "materiasPrimas": MatPrimaCtrl.getMatPrimas(),
      "materiaisEmbalagem": MatEmbCtrl.getMatEmb()
    }

    return manipulado;
  }

  const saveOrcamentoData = (e) => {
    e.preventDefault()
    if (validateBeforeSaving()) {
      fetch("/orcamento", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createObjectToSend())

      }).then((response) => {

        console.log(response);
      });
    } else {
      console.log('Data not saved!');
    }
  }

  const validateBeforeSaving = () => {
    console.log(validateFormaFarmaceutica() + ' ' + validateMateriasPrimas() + ' ' + validateMateriaisEmb())
    if (validateFormaFarmaceutica() && validateMateriasPrimas() && validateMateriaisEmb()) {
      console.log('Validated successfully!');
      return true
    } else {
      alert('Um ou mais elementos não estão validados. Tente novamente!');
      return false
    }

  }

  const validateFormaFarmaceutica = () => {
    console.log(nomeManipulado + ' ' + fFarmNome + ' ' + fFarmPrice + ' ' + totalPrice + ' ' + IVA)
    if (nomeManipulado && fFarmNome && fFarmPrice && totalPrice && IVA) {

      return true;
    }
  }

  const validateMateriasPrimas = () => {
    if (MatPrimaCtrl.getMatPrimas().length > 0) {
      return true;
    }
  }

  const validateMateriaisEmb = () => {
    if (MatEmbCtrl.getMatEmb().length > 0) {
      return true;
    }
  }

  const getfFarmPrice = () => fFarmPrice;

  const getMatPrimasPrice = () => matPrimasPrice;

  const getMatEmbPrice = () => matEmbPrice;

  const getTotalPrice = () => totalPrice;

  const getIVA = () => IVA;

  const setNomeManipulado = (nome) => nomeManipulado = nome;

  const setfFarmPrice = (price) => fFarmPrice = price;

  const setMatPrimasPrice = (price) => matPrimasPrice = price;

  const setMatEmbPrice = (price) => matEmbPrice = price;

  const setIVA = (value) => IVA = value;

  const setTotalPrice = (price) => totalPrice = price;

  const setNomeFormaFarm = (fFarm) => fFarmNome = fFarm

  return {

    fetchFormasFarmaceuticas,

    calculateFormaFarmaceutica,

    calculateTotalPrice,

    createObjectToSend,

    saveOrcamentoData,

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

    setTotalPrice,

    setNomeManipulado,

    setNomeFormaFarm,

    validateFormaFarmaceutica,

    validateMateriasPrimas,

    validateMateriaisEmb,

    validateBeforeSaving
  }

})();



const UICtrl = (function () {

  const UISelectors = {

    formaFarmaceuticaSelect: document.getElementById("select-forma-farmaceutica"),
    nomeManipulado: document.querySelector('.nome-manipulado'),
    formaFarmNome: document.getElementById("select-forma-farmaceutica"),
    formaFarmQtd: document.querySelector('.forma-farm-qtd'),
    fatorSelect: document.getElementById("select-fator"),
    matPrimasSummaryList: document.getElementById("mat-primas-summary-list"),
    matPrimaTotalPrice: document.querySelector('.mat-prima-total-price'),
    matEmbTotalPrice: document.querySelector('.mat-emb-total-price'),
    matPrimNome: document.getElementById("nome-mat-prim"),
    matPrimPreco: document.getElementById("preco-mat-prim"),
    matPrimQtd: document.getElementById("qtd-mat-prim"),
    matPrimFator: document.getElementById("select-fator"),
    matEmbNome: document.getElementById("nome-mat-emb"),
    matEmbPreco: document.getElementById("preco-mat-emb"),
    matEmbQtd: document.getElementById("qtd-mat-emb"),
    matEmbSummaryList: document.getElementById("mat-emb-summary-list"),
    formFarmTotalPrice: document.querySelector('.forma-farm-total-price'),
    addFormaFarmButton: document.querySelector(".add-forma-farm-button"),
    addMatPrimaButton: document.getElementById("add-mat-prima-button"),
    addMatEmbButton: document.getElementById("add-mat-emb-button"),
    saveButton: document.querySelector(".save-button")


  }


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
    for (let fator in fatores) {
      let option = document.createElement("option");
      option.value = fator;
      option.text = fator;
      UISelectors.fatorSelect.add(option);
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

  const deleteMatPrimaFields = () => {
    UISelectors.matPrimNome.value = "";
    UISelectors.matPrimPreco.value = "";
    UISelectors.matPrimQtd.value = "";
    UISelectors.matPrimFator.selectedIndex = 0;

  }

  const deleteMatPrimaItem = (index) => {
    const itemID = `#mat-prima-${index}`;
    const item = document.querySelector(itemID);
    item.remove();
  }

  const displayMatPrimaTotalPrice = (fct) => {
    let totalPrice = MatPrimaCtrl.calculateTotalPrice(fct);
    UISelectors.matPrimaTotalPrice.innerHTML = totalPrice;
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

  const deleteMatEmbFields = () => {

    UISelectors.matEmbNome.value = "";
    UISelectors.matEmbPreco.value = "";
    UISelectors.matEmbQtd.value = "";
  }

  const deleteMatEmbItem = (index) => {
    const itemID = `#mat-emb-${index}`;
    const item = document.querySelector(itemID);
    item.remove();
  }

  const displayMatEmbTotalPrice = () => {
    let totalPrice = +((MatEmbCtrl.calculateTotalPrice() * 1.2).toFixed(2));
    UISelectors.matEmbTotalPrice.innerHTML = totalPrice;
    Model.setMatEmbPrice(totalPrice);
  }

  const displayFormaFarmaceuticaPrice = () => {
    Model.fetchFormasFarmaceuticas().then(ff => {
      let price = Model.calculateFormaFarmaceutica(ff);
      UISelectors.formFarmTotalPrice.innerHTML = price;
      Model.setfFarmPrice(price);
      Model.setNomeManipulado(saveNomeManipulado());
      Model.setNomeFormaFarm(saveNomeFormaFarma());
      displayTotal();
    })
  }

  const saveNomeFormaFarma = () => {
    return UISelectors.formaFarmNome.value;
  }

  const saveNomeManipulado = () => {
    return UISelectors.nomeManipulado.value;
  }

  const displayTotal = () => {
    let [total, iva] = Model.calculateTotalPrice();
    const totalTotalPrice = document.querySelector('.total-total-price');
    totalTotalPrice.innerHTML = total;
    const ivaTotalPrice = document.querySelector('.iva-total-price');
    ivaTotalPrice.innerHTML = iva;
  }

  return {

    UISelectors,

    formaFarmaceuticaSelectPopulate,

    fatorSelectPopulate,

    addMatPrimaItem,

    deleteMatPrimaFields,

    deleteMatPrimaItem,

    displayMatPrimaTotalPrice,

    addMatEmbItem,

    deleteMatEmbFields,

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
    let id;
    if (currentId) {
      id = currentId;
    } else {
      id = 0;
      currentId = 0;
    }

    let matPrima = new MateriaPrima(id, UICtrl.UISelectors.matPrimNome.value, UICtrl.UISelectors.matPrimPreco.value, UICtrl.UISelectors.matPrimQtd.value, UICtrl.UISelectors.matPrimFator.value);
    if (validateMatPrima(matPrima)) {
      materiasPrimas.push(matPrima);
      Model.fetchFatores().then(fct => UICtrl.addMatPrimaItem(matPrima, fct));
      Model.fetchFatores().then(fct => {
        UICtrl.displayMatPrimaTotalPrice(fct);
        UICtrl.displayTotal();
        UICtrl.deleteMatPrimaFields();
      });
    } else {
      alert('Um ou mais campos da matéria prima estão em falta. Repita por favor!');
    }


  }

  const removeMatPrima = (e) => {
    let elementToRemove = e.target.parentNode;
    let indexToRemove = elementToRemove.id.split('-')[2];
    let materiasPrimasUpdated = materiasPrimas.filter(
      matPrim => parseInt(matPrim.id) !== parseInt(indexToRemove));
    materiasPrimas = materiasPrimasUpdated
    UICtrl.deleteMatPrimaItem(indexToRemove)
    Model.fetchFatores().then(fct => {
      UICtrl.displayMatPrimaTotalPrice(fct);
      UICtrl.displayTotal();
    });
  }

  const calculateLinePrice = (item, fct) => {
    return +((item.preco * item.qtd * fct[item.fator][1]).toFixed(2))
  }

  const calculateTotalPrice = (fct) => {
    let valor = 0;

    for (let i = 0; i < materiasPrimas.length; i++) {
      valor += +(materiasPrimas[i].preco) * +(materiasPrimas[i].qtd) * +((fct[materiasPrimas[i].fator][1]))
    }

    return +(valor.toFixed(2));
  }

  const validateMatPrima = (matPrima) => {
    if (matPrima.id !== null && matPrima.nome && matPrima.qtd && matPrima.fator) {
      return true;
    } else {
      return false;
    }
  }

  return {

    getMatPrimas,

    addMatPrima,

    removeMatPrima,

    calculateLinePrice,

    calculateTotalPrice,

    validateMatPrima
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

    let id;

    if (currentId) {
      id = currentId;
    } else {
      id = 0;
      currentId = 0;
    }

    let matEmb = new MaterialEmbalagem(id, UICtrl.UISelectors.matEmbNome.value, UICtrl.UISelectors.matEmbPreco.value, UICtrl.UISelectors.matEmbQtd.value);
    if (validateMatEmb(matEmb)) {
      materiaisEmbalagem.push(matEmb);
      UICtrl.addMatEmbItem(matEmb);
      UICtrl.displayMatEmbTotalPrice();
      currentId += 1;
      UICtrl.displayTotal();
      UICtrl.deleteMatEmbFields();
    } else {
      alert('Um ou mais campos do material de embalagem estão em falta. Repita por favor!')
    }

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
    return +((item.preco * item.qtd).toFixed(2));
  }

  const calculateTotalPrice = () => {
    let valor = 0;

    for (let i = 0; i < materiaisEmbalagem.length; i++) {
      valor += +(materiaisEmbalagem[i].preco) * +(materiaisEmbalagem[i].qtd);
    }

    return +(valor.toFixed(2))
  }

  const getMatEmb = () => {

    return materiaisEmbalagem;

  }

  const validateMatEmb = (matEmb) => {
    if (matEmb.id !== null && matEmb.nome && matEmb.qtd) {
      return true;
    } else {
      return false;
    }
  }

  return {

    addMatEmb,

    removeMatEmb,

    calculateLinePrice,

    calculateTotalPrice,

    getMatEmb,

    validateMatEmb

  }

})()

const AppCtrl = (function (UICtrl, MatPrimaCtrl, MatEmbCtrl, Model) {

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

AppCtrl.init();
