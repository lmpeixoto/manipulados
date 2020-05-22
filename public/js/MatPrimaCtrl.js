import { Model } from "./Model.js";
import { UICtrl } from "./UICtrl.js";


export const MatPrimaCtrl = (function () {
    const MateriaPrima = function (id, nome, preco, qtd, fator) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.qtd = qtd;
        this.fator = fator;
    };
    let currentId;
    let materiasPrimas = [];
    const getMatPrimas = () => {
        return materiasPrimas;
    };
    const addMatPrima = () => {
        let id;
        if (currentId) {
            id = currentId;
        }
        else {
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
        }
        else {
            alert('Um ou mais campos da matéria prima estão em falta. Repita por favor!');
        }
    };
    const removeMatPrima = (e) => {
        let elementToRemove = e.target.parentNode;
        let indexToRemove = elementToRemove.id.split('-')[2];
        let materiasPrimasUpdated = materiasPrimas.filter(matPrim => parseInt(matPrim.id) !== parseInt(indexToRemove));
        materiasPrimas = materiasPrimasUpdated;
        UICtrl.deleteMatPrimaItem(indexToRemove);
        Model.fetchFatores().then(fct => {
            UICtrl.displayMatPrimaTotalPrice(fct);
            UICtrl.displayTotal();
        });
    };
    const calculateLinePrice = (item, fct) => {
        return +((item.preco * item.qtd * fct[item.fator][1]).toFixed(2));
    };
    const calculateTotalPrice = (fct) => {
        let valor = 0;
        for (let i = 0; i < materiasPrimas.length; i++) {
            valor += +(materiasPrimas[i].preco) * +(materiasPrimas[i].qtd) * +((fct[materiasPrimas[i].fator][1]));
        }
        return +(valor.toFixed(2));
    };
    const validateMatPrima = (matPrima) => {
        if (matPrima.id !== null && matPrima.nome && matPrima.qtd && matPrima.fator) {
            return true;
        }
        else {
            return false;
        }
    };
    return {
        getMatPrimas,
        addMatPrima,
        removeMatPrima,
        calculateLinePrice,
        calculateTotalPrice,
        validateMatPrima
    };
})();


