const fct = require('../model/unidades.json');

class MateriaPrima {
    constructor(nome, preco, qtd, fator) {
        this.nome = nome;
        this.preco = preco;
        this.qtd = qtd;
        this.fator = fator;
        this.valor;
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
