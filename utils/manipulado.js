const formasFarmaceuticas = require('../model/formas-farmaceuticas.json');
const fct = require('../model/unidades.json');
const MateriaPrima = require('./materiaPrima');
const MaterialEmbalagem = require('./materialEmbalagem');

const matPrimReader = (matPrimArray) => {
    let materiasPrimas = [];
    matPrimArray.forEach((matPrim) => {
        materiasPrimas.push(
            new MateriaPrima(
                matPrim.nome,
                matPrim.preco,
                matPrim.qtd,
                matPrim.fator
            )
        );
    });
    return materiasPrimas;
};

const matEmbReader = (matEmbArray) => {
    let materiaisEmbalagem = [];
    matEmbArray.forEach((matEmb) => {
        materiaisEmbalagem.push(
            new MaterialEmbalagem(
                matEmb.nome,
                matEmb.capacidade,
                matEmb.preco,
                matEmb.qtd
            )
        );
    });
    return materiaisEmbalagem;
};

const roundNumberToTwoDecimals = (num) => {
    return +num.toFixed(2);
};

class Manipulado {
    constructor(
        lote,
        nomeManipulado,
        fatorF,
        utenteNome,
        utenteContacto,
        prescritorNome,
        prescritorContacto,
        farmaceuticoNome,
        farmaceuticoSupervisor,
        preparacao,
        conservacao,
        validade,
        fFarmNome,
        fFarmQtd,
        materiasPrimas,
        materiaisEmbalagem,
        validacoes
    ) {
        this.lote = lote;
        this.nomeManipulado = nomeManipulado;
        this.fatorF = 4;
        this.utenteNome = utenteNome;
        this.utenteContacto = utenteContacto;
        this.prescritorNome = prescritorNome;
        this.prescritorContacto = prescritorContacto;
        this.farmaceuticoNome = farmaceuticoNome;
        this.farmaceuticoSupervisor = farmaceuticoSupervisor;
        this.preparacao = preparacao;
        this.conservacao = conservacao;
        this.validade = validade;
        this.fFarmNome = fFarmNome;
        this.fFarmPrice;
        this.fFarmQtd = fFarmQtd;
        this.materiasPrimas = matPrimReader(materiasPrimas);
        this.materiaisEmbalagem = matEmbReader(materiaisEmbalagem);
        this.validacoes = validacoes;
        this.matPrimTotalPrice;
        this.matEmbTotalPrice;
        this.IVA;
        this.totalPrice;
    }

    calculateFFarmPrice(formasFarmaceuticas) {
        let formaFarmaceuticaPrice;
        const qtd = this.fFarmQtd;
        const fatorF = this.fatorF;
        const limite = +formasFarmaceuticas[this.fFarmNome][0];
        const fatorNormal = +formasFarmaceuticas[this.fFarmNome][1];
        const fatorSuplemento = +formasFarmaceuticas[this.fFarmNome][2];
        if (qtd <= limite) {
            formaFarmaceuticaPrice = fatorF * fatorNormal;
        } else {
            let excesso = qtd - limite;
            formaFarmaceuticaPrice =
                fatorF * fatorNormal + excesso * fatorSuplemento;
        }
        formaFarmaceuticaPrice = roundNumberToTwoDecimals(
            formaFarmaceuticaPrice
        );
        return formaFarmaceuticaPrice;
    }

    calculateMatPrimasTotalPrice(fct) {
        let val = 0;
        for (let i = 0; i < this.materiasPrimas.length; i++) {
            val +=
                +this.materiasPrimas[i].preco *
                +this.materiasPrimas[i].qtd *
                +fct[this.materiasPrimas[i].fator][1];
        }
        return roundNumberToTwoDecimals(val);
    }

    calculateMatEmbTotalPrice() {
        let valor = 0;

        for (let i = 0; i < this.materiaisEmbalagem.length; i++) {
            valor +=
                +this.materiaisEmbalagem[i].preco *
                +this.materiaisEmbalagem[i].qtd;
        }
        return roundNumberToTwoDecimals(valor);
    }

    calculateTotalPrice() {
        this.calculateIVA();
        let finalPrice = roundNumberToTwoDecimals(
            this.calculateSemiTotalPrice() + this.IVA
        );
        this.setTotalPrice(finalPrice);
        return finalPrice;
    }

    calculateIVA() {
        const IVA = roundNumberToTwoDecimals(
            this.calculateSemiTotalPrice() * 0.23
        );
        this.setIVA(IVA);
        return IVA;
    }

    calculateSemiTotalPrice() {
        this.setFFarmPrice(this.calculateFFarmPrice(formasFarmaceuticas));
        this.setMatPrimasTotalPrice(this.calculateMatPrimasTotalPrice(fct));
        this.setMatEmbTotalPrice(this.calculateMatEmbTotalPrice());
        let semiTotalPrice = roundNumberToTwoDecimals(
            1.3 *
                (this.fFarmPrice +
                    this.matPrimTotalPrice +
                    this.matEmbTotalPrice)
        );
        return semiTotalPrice;
    }

    setFFarmPrice(price) {
        this.fFarmPrice = price;
    }

    setMatPrimasTotalPrice(val) {
        this.matPrimTotalPrice = val;
    }

    setMatEmbTotalPrice(val) {
        this.matEmbTotalPrice = val;
    }

    setTotalPrice(price) {
        this.totalPrice = price;
    }

    setIVA(IVA) {
        this.IVA = IVA;
    }

    getTotalPrice() {
        return this.totalPrice;
    }
}

module.exports = Manipulado;
