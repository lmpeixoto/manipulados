const formasFarmaceuticas = require('../models/formas-farmaceuticas.json');
const fct = require('../models/fatores.json');
const {
    matPrimReader,
    matEmbReader,
    roundNumberToTwoDecimals
} = require('./utils');

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

module.exports = { Orcamento };
