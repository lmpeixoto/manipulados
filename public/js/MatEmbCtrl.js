import { UICtrl } from "./UICtrl.js";

export const MatEmbCtrl = (function () {

    const MaterialEmbalagem = function (id, nome, capacidade, preco, qtd) {

        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
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

        let matEmb = new MaterialEmbalagem(id, UICtrl.UISelectors.matEmbNome.value, UICtrl.UISelectors.matEmbCapacidade.value, UICtrl.UISelectors.matEmbPreco.value, UICtrl.UISelectors.matEmbQtd.value);
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
        if (matEmb.id !== null && matEmb.nome && matEmb.capacidade && matEmb.qtd) {
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

})();



