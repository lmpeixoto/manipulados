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
        fFarmPrice,
        fFarmQtd,
        materiasPrimas,
        materiaisEmbalagem,
        validacoes
    ) {
        this.lote = lote;
        this.nomeManipulado = nomeManipulado;
        this.fatorF = fatorF;
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
        this.fFarmPrice = fFarmPrice;
        this.fFarmQtd = fFarmQtd;
        this.materiasPrimas = matPrimReader(materiasPrimas);
        this.materiaisEmbalagem = matEmbReader(materiaisEmbalagem);
        this.validacoes = validacoes;
        this.matPrimTotalPrice;
        this.matEmbTotalPrice;
        this.IVA;
        this.totalPrice;
    }

    calculateMatPrimasTotalPrice(fct) {
        let val = 0;
        for (let i = 0; i < this.materiasPrimas.length; i++) {
            val +=
                +this.materiasPrimas[i].preco *
                +this.materiasPrimas[i].qtd *
                +fct[this.materiasPrimas[i].fator][1];
        }
        return +val.toFixed(2);
    }

    calculateMatEmbTotalPrice() {
        let valor = 0;

        for (let i = 0; i < this.materiaisEmbalagem.length; i++) {
            valor +=
                +this.materiaisEmbalagem[i].preco *
                +this.materiaisEmbalagem[i].qtd;
        }
        return +valor.toFixed(2);
    }

    calculateTotalPrice() {
        this.setMatPrimasTotalPrice(this.calculateMatPrimasTotalPrice(fct));
        this.setMatEmbTotalPrice(this.calculateMatEmbTotalPrice());
        let totalPrice =
            (this.fFarmPrice + this.matPrimTotalPrice + this.matEmbTotalPrice) *
            1.3;
        let IVA = +(totalPrice * 0.023).toFixed(2);
        let finalPrice = +(totalPrice + IVA).toFixed(2);
        this.setTotalPrice(finalPrice);
        this.setIVA(IVA);
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
