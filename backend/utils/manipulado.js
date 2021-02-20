const formasFarmaceuticas = require('../models/formas-farmaceuticas.json');
const fct = require('../models/fatores.json');
const MateriaPrima = require('./materiaPrima');
const MaterialEmbalagem = require('./materialEmbalagem');

const matPrimReader = (matPrimArray) => {
    console.log(matPrimArray);
    let materiasPrimas = [];
    matPrimArray.forEach((matPrim) => {
        materiasPrimas.push(
            new MateriaPrima(
                matPrim.nome,
                matPrim.preco,
                matPrim.quantidade,
                matPrim.fator,
                matPrim.valor
            )
        );
    });
    return materiasPrimas;
};

const matEmbReader = (matEmbArray) => {
    console.log(matEmbArray);
    let materiaisEmbalagem = [];
    matEmbArray.forEach((matEmb) => {
        materiaisEmbalagem.push(
            new MaterialEmbalagem(
                matEmb.nome,
                matEmb.capacidade,
                matEmb.preco,
                matEmb.quantidade,
                matEmb.valor
            )
        );
    });
    return materiaisEmbalagem;
};

const roundNumberToTwoDecimals = (num) => {
    return +num.toFixed(2);
};

class Orcamento {
    constructor(
        nomeManipulado,
        fFarmNome,
        fFarmQtd,
        fatorF,
        materiasPrimas,
        materiaisEmbalagem
    ) {
        this.nomeManipulado = nomeManipulado;
        this.fatorF = fatorF;
        this.fFarmNome = fFarmNome;
        this.fFarmPrice;
        this.fFarmQtd = fFarmQtd;
        this.materiasPrimas = matPrimReader(materiasPrimas);
        this.materiaisEmbalagem = matEmbReader(materiaisEmbalagem);
        this.matPrimTotalPrice;
        this.matEmbTotalPrice;
        this.IVA;
        this.totalPrice;
    }

    calculateFFarmPrice() {
        let formaFarmaceuticaPrice;
        const qtd = this.fFarmQtd;
        const fatorF = this.fatorF;
        const limite = +formasFarmaceuticas[this.fFarmNome.toLowerCase()][0];
        const fatorNormal = +formasFarmaceuticas[
            this.fFarmNome.toLowerCase()
        ][1];
        const fatorSuplemento = +formasFarmaceuticas[
            this.fFarmNome.toLowerCase()
        ][2];
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

    calculateMatPrimasTotalPrice() {
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

class Manipulado extends Orcamento {
    constructor(
        lote,
        nomeManipulado,
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
        super(
            nomeManipulado,
            fFarmNome,
            fFarmQtd,
            materiasPrimas,
            materiaisEmbalagem
        );
        this.lote = lote;
        this.utenteNome = utenteNome;
        this.utenteContacto = utenteContacto;
        this.prescritorNome = prescritorNome;
        this.prescritorContacto = prescritorContacto;
        this.farmaceuticoNome = farmaceuticoNome;
        this.farmaceuticoSupervisor = farmaceuticoSupervisor;
        this.preparacao = preparacao;
        this.conservacao = conservacao;
        this.validade = validade;
        this.validacoes = validacoes;
    }
}

module.exports = { Orcamento, Manipulado };
