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
        let total = 0;
        const qtd = +this.fFarmQtd;
        const FATOR_F = +this.fatorF;
        const limite = +formasFarmaceuticas[this.fFarmNome.toLowerCase()][0];
        const fator = +formasFarmaceuticas[this.fFarmNome.toLowerCase()][1];
        const excesso = +formasFarmaceuticas[this.fFarmNome.toLowerCase()][2];
        if (qtd <= limite) {
            total = FATOR_F * fator;
        } else {
            let valorNormal = roundNumberToTwoDecimals(FATOR_F * fator);
            let quantidadeExtra = roundNumberToTwoDecimals(qtd - limite);
            let valorExtra = roundNumberToTwoDecimals(
                quantidadeExtra * FATOR_F * excesso
            );
            total = roundNumberToTwoDecimals(valorNormal + valorExtra);
        }
        total = roundNumberToTwoDecimals(total);
        return total;
    }

    calculateMatPrimasTotalPrice() {
        let total = 0;
        for (let i = 0; i < this.materiasPrimas.length; i++) {
            total += roundNumberToTwoDecimals(
                +this.materiasPrimas[i].preco *
                    +this.materiasPrimas[i].qtd *
                    +fct[this.materiasPrimas[i].fator][1]
            );
        }
        return roundNumberToTwoDecimals(total);
    }

    calculateMatEmbTotalPrice() {
        let total = 0;
        for (let i = 0; i < this.materiaisEmbalagem.length; i++) {
            total += roundNumberToTwoDecimals(
                +this.materiaisEmbalagem[i].preco *
                    +this.materiaisEmbalagem[i].qtd
            );
        }
        return roundNumberToTwoDecimals(total);
    }

    calculateTotalPrice() {
        this.calculateIVA();
        let finalPrice = roundNumberToTwoDecimals(
            this.calculateSemiTotalPrice() + +this.IVA
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
                roundNumberToTwoDecimals(
                    this.fFarmPrice +
                        this.matPrimTotalPrice +
                        this.matEmbTotalPrice
                )
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
