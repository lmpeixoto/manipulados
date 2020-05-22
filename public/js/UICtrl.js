import { MatEmbCtrl } from './MatEmbCtrl.js';
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { Model } from "./Model.js";


export const UICtrl = (function () {
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
        matEmbCapacidade: document.getElementById("capacidade-mat-emb"),
        matEmbPreco: document.getElementById("preco-mat-emb"),
        matEmbQtd: document.getElementById("qtd-mat-emb"),
        matEmbSummaryList: document.getElementById("mat-emb-summary-list"),
        formFarmTotalPrice: document.querySelector('.forma-farm-total-price'),
        addFormaFarmButton: document.querySelector(".add-forma-farm-button"),
        addMatPrimaButton: document.getElementById("add-mat-prima-button"),
        addMatEmbButton: document.getElementById("add-mat-emb-button"),
        saveButton: document.querySelector(".save-button")
    };
    const formaFarmaceuticaSelectPopulate = (fFarm) => {
        const formaFarmaceuticaSelect = document.getElementById("select-forma-farmaceutica");
        let formasFarmaceuticas = Object.keys(fFarm);
        formasFarmaceuticas.forEach((ff) => {
            let option = document.createElement("option");
            option.value = ff;
            option.text = ff;
            formaFarmaceuticaSelect.add(option);
        });
    };
    const fatorSelectPopulate = (fatores) => {
        for (let fator in fatores) {
            let option = document.createElement("option");
            option.value = fator;
            option.text = fator;
            UISelectors.fatorSelect.add(option);
        }
    };
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
    };
    const deleteMatPrimaFields = () => {
        UISelectors.matPrimNome.value = "";
        UISelectors.matPrimPreco.value = "";
        UISelectors.matPrimQtd.value = "";
        UISelectors.matPrimFator.selectedIndex = 0;
    };
    const deleteMatPrimaItem = (index) => {
        const itemID = `#mat-prima-${index}`;
        const item = document.querySelector(itemID);
        item.remove();
    };
    const displayMatPrimaTotalPrice = (fct) => {
        let totalPrice = MatPrimaCtrl.calculateTotalPrice(fct);
        UISelectors.matPrimaTotalPrice.innerHTML = totalPrice;
        Model.setMatPrimasPrice(parseFloat(totalPrice));
    };
    const addMatEmbItem = (item) => {
        let precoLinha = MatEmbCtrl.calculateLinePrice(item);
        let html = `<li class="mat-emb-element" id="mat-emb-${item.id}">
                    ${item.nome} -  ${item.capacidade} - ${item.qtd} - ${item.preco}€ - Valor: ${precoLinha}€  
                      <button type="button" class="rem-mat-emb-button">
                        <span class="glyphicon glyphicon-minus">
                        </span>Remover
                      </button>`;
        const matEmbSummaryList = document.getElementById("mat-emb-summary-list");
        matEmbSummaryList.innerHTML += html;
        matEmbSummaryList.addEventListener("click", MatEmbCtrl.removeMatEmb);
    };
    const deleteMatEmbFields = () => {
        UISelectors.matEmbNome.value = "";
        UISelectors.matEmbCapacidade.value = "";
        UISelectors.matEmbPreco.value = "";
        UISelectors.matEmbQtd.value = "";
    };
    const deleteMatEmbItem = (index) => {
        const itemID = `#mat-emb-${index}`;
        const item = document.querySelector(itemID);
        item.remove();
    };
    const displayMatEmbTotalPrice = () => {
        let totalPrice = +((MatEmbCtrl.calculateTotalPrice() * 1.2).toFixed(2));
        UISelectors.matEmbTotalPrice.innerHTML = totalPrice;
        Model.setMatEmbPrice(totalPrice);
    };
    const displayFormaFarmaceuticaPrice = () => {
        Model.fetchFormasFarmaceuticas().then(ff => {
            let price = Model.calculateFormaFarmaceutica(ff);
            UISelectors.formFarmTotalPrice.innerHTML = price;
            Model.setfFarmPrice(price);
            Model.setNomeManipulado(saveNomeManipulado());
            Model.setNomeFormaFarm(saveNomeFormaFarma());
            displayTotal();
        });
    };
    const saveNomeFormaFarma = () => {
        return UISelectors.formaFarmNome.value;
    };
    const saveNomeManipulado = () => {
        return UISelectors.nomeManipulado.value;
    };
    const displayTotal = () => {
        let [total, iva] = Model.calculateTotalPrice();
        const totalTotalPrice = document.querySelector('.total-total-price');
        totalTotalPrice.innerHTML = total;
        const ivaTotalPrice = document.querySelector('.iva-total-price');
        ivaTotalPrice.innerHTML = iva;
    };
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
    };
})();