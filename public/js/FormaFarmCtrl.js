import { OrcamentoUICtrl } from './OrcamentoUICtrl.js'
import { OrcamentoModel } from './OrcamentoModel.js';


export const FormaFarmCtrl = (function () {



    const FormaFarmaceutica = function (nome, qtd, preco) {
        this.nome = nome;
        this.qtd = qtd;
        this.preco = preco;
    }

    const createFormaFarmaceutica = (fFarm, qtd, preco) => {
        const formaFarmaceutica = new FormaFarmaceutica(fFarm, qtd, preco);
        return formaFarmaceutica;
    };

    const fetchFormasFarmaceuticas = async () => {
        let response = await fetch("/formasFarmaceuticas");
        let data = await response.json();
        return data;
    };

    const calculateFormaFarmaceutica = (formasFarmaceuticas, fFarm) => {
        let formaFarmaceuticaPrice;
        const qtd = OrcamentoUICtrl.UISelectors.formaFarmQtd.value;
        const fatorF = OrcamentoModel.getFatorF();
        const limite = +(formasFarmaceuticas[fFarm][0]);
        const fatorNormal = +(formasFarmaceuticas[fFarm][1]);
        const fatorSuplemento = +(formasFarmaceuticas[fFarm][2]);
        if (qtd <= limite) {
            formaFarmaceuticaPrice = fatorF * fatorNormal;
        }
        else {
            let excesso = qtd - limite;
            formaFarmaceuticaPrice = (fatorF * fatorNormal) + (excesso * fatorSuplemento);
        }
        formaFarmaceuticaPrice = +(formaFarmaceuticaPrice.toFixed(2));
        return formaFarmaceuticaPrice;
    };




    return {

        createFormaFarmaceutica,
        fetchFormasFarmaceuticas,
        calculateFormaFarmaceutica
    }

})();