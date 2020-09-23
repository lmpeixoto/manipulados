// @ts-check

export const MatEmbCtrl = (function () {
    const MaterialEmbalagem = function (
        id,
        nome,
        capacidade,
        preco,
        qtd,
        valor
    ) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.preco = preco;
        this.qtd = qtd;
        this.valor = valor;
    };

    let UIController;

    let materiaisEmbalagem = [];

    let currentId;

    const calculateLinePrice = (preco, qtd) => {
        return +(preco * qtd).toFixed(2);
    };

    const addMatEmb = () => {
        let id;

        if (currentId) {
            id = currentId;
        } else {
            id = 0;
            currentId = 0;
        }

        let nome = UIController.UISelectors.matEmbNome.value;
        let capacidade = UIController.UISelectors.matEmbCapacidade.value;
        let preco = UIController.UISelectors.matEmbPreco.value;
        let qtd = UIController.UISelectors.matEmbQtd.value;

        let matEmb = new MaterialEmbalagem(
            id,
            nome,
            capacidade,
            preco,
            qtd,
            calculateLinePrice(preco, qtd)
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
                'Um ou mais campos do material de embalagem estão em falta. Repita por favor!'
            );
        }
    };

    const removeMatEmb = (e) => {
        let elementToRemove = e.target.parentNode;
        let indexToRemove = elementToRemove.id.split('-')[2];
        let matEmbUpdated = materiaisEmbalagem.filter(
            (matEmb) => parseInt(matEmb.id) !== parseInt(indexToRemove)
        );
        materiaisEmbalagem = matEmbUpdated;
        UIController.deleteMatEmbItem(indexToRemove);
        UIController.displayMatEmbTotalPrice();
        UIController.displayTotal();
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
        if (
            matEmb.id !== null &&
            matEmb.nome &&
            matEmb.capacidade &&
            matEmb.qtd
        ) {
            return true;
        } else {
            return false;
        }
    };

    const setUI = (UI) => (UIController = UI);

    const setMateriaisEmbalagem = (matEmb) => {
        materiaisEmbalagem = matEmb;
    };

    return {
        MaterialEmbalagem,
        addMatEmb,
        removeMatEmb,
        calculateTotalPrice,
        getMatEmb,
        setMateriaisEmbalagem,
        validateMatEmb,
        setUI
    };
})();
