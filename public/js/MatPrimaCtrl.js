import { OrcamentoModel } from "./OrcamentoModel.js";
import { OrcamentoUICtrl } from "./OrcamentoUICtrl.js";


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

    const fetchFatores = async () => {
        let response = await fetch("/fatores");
        let data = await response.json();
        return data;
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
        let matPrima = new MateriaPrima(id, OrcamentoUICtrl.UISelectors.matPrimNome.value, OrcamentoUICtrl.UISelectors.matPrimPreco.value, OrcamentoUICtrl.UISelectors.matPrimQtd.value, OrcamentoUICtrl.UISelectors.matPrimFator.value);
        if (validateMatPrima(matPrima)) {
            materiasPrimas.push(matPrima);
            fetchFatores().then(fct => OrcamentoUICtrl.addMatPrimaItem(matPrima, fct));
            fetchFatores().then(fct => {
                OrcamentoUICtrl.displayMatPrimaTotalPrice(fct);
                OrcamentoUICtrl.displayTotal();
                OrcamentoUICtrl.deleteMatPrimaFields();
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
        OrcamentoUICtrl.deleteMatPrimaItem(indexToRemove);
        fetchFatores().then(fct => {
            OrcamentoUICtrl.displayMatPrimaTotalPrice(fct);
            OrcamentoUICtrl.displayTotal();
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
        fetchFatores,
        addMatPrima,
        removeMatPrima,
        calculateLinePrice,
        calculateTotalPrice,
        validateMatPrima
    };
})();


