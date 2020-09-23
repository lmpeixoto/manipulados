// @ts-check

export const MatPrimaCtrl = (function () {
    const MateriaPrima = function (id, nome, preco, qtd, fator, valor) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.qtd = qtd;
        this.fator = fator;
        this.valor = valor;
    };

    let UIController;

    let currentId;

    let materiasPrimas = [];

    const getMatPrimas = () => {
        return materiasPrimas;
    };

    const fetchFatores = async () => {
        let response = await fetch('/fatores');
        let data = await response.json();
        return data;
    };

    const calculateMatPrimaPrice = (preco, qtd, fator, fct) => {
        return +(preco * qtd * fct[fator][1]).toFixed(2);
    };

    const addMatPrima = () => {
        let id;
        if (currentId) {
            id = currentId;
        } else {
            id = 0;
            currentId = 0;
        }

        let nome = UIController.UISelectors.matPrimNome.value;
        let preco = UIController.UISelectors.matPrimPreco.value;
        let qtd = UIController.UISelectors.matPrimQtd.value;
        let fator = UIController.UISelectors.matPrimFator.value;

        fetchFatores().then((fct) => {
            let valor = calculateMatPrimaPrice(preco, qtd, fator, fct);
            let matPrima = new MateriaPrima(id, nome, preco, qtd, fator, valor);

            if (validateMatPrima(matPrima)) {
                materiasPrimas.push(matPrima);
                UIController.addMatPrimaItem(matPrima, fct);
                UIController.displayMatPrimaTotalPrice(fct);
                UIController.displayTotal();
                UIController.deleteMatPrimaFields();
            } else {
                alert(
                    'Um ou mais campos da matéria prima estão em falta. Repita por favor!'
                );
            }
        });
    };

    const removeMatPrima = (e) => {
        let elementToRemove = e.target.parentNode;
        console.log(elementToRemove);
        let indexToRemove = elementToRemove.id.split('-')[2];
        let materiasPrimasUpdated = materiasPrimas.filter(
            (matPrim) => parseInt(matPrim.id) !== parseInt(indexToRemove)
        );
        materiasPrimas = materiasPrimasUpdated;
        UIController.deleteMatPrimaItem(indexToRemove);
        fetchFatores().then((fct) => {
            UIController.displayMatPrimaTotalPrice(fct);
            UIController.displayTotal();
        });
    };

    const calculateTotalPrice = (fct) => {
        let val = 0;
        for (let i = 0; i < materiasPrimas.length; i++) {
            val +=
                +materiasPrimas[i].preco *
                +materiasPrimas[i].qtd *
                +fct[materiasPrimas[i].fator][1];
        }
        return +val.toFixed(2);
    };
    const validateMatPrima = (matPrima) => {
        if (
            matPrima.id !== null &&
            matPrima.nome &&
            matPrima.qtd &&
            matPrima.fator
        ) {
            return true;
        } else {
            return false;
        }
    };

    const setUI = (UI) => (UIController = UI);

    const setMateriasPrimas = (matPrim) => {
        materiasPrimas = matPrim;
    };

    return {
        MateriaPrima,
        getMatPrimas,
        setMateriasPrimas,
        fetchFatores,
        addMatPrima,
        removeMatPrima,
        calculateTotalPrice,
        validateMatPrima,
        setUI
    };
})();
