const fct = require('../models/fatores.json');

class MateriaPrima {
    constructor(nome, preco, qtd, fator, valor) {
        this.nome = nome;
        this.preco = preco;
        this.qtd = qtd;
        this.fator = fator;
        this.valor = valor;
    }

    calculateMatPrimaPrice() {
        return +(this.preco * this.qtd * fct[this.fator][1]).toFixed(2);
    }

    setMatPrimaValor(valor) {
        this.valor = valor;
    }

    getMatPrimaValor() {
        return this.valor;
    }
}

module.exports = MateriaPrima;
