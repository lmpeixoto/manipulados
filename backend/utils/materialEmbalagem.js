class MaterialEmbalagem {
    constructor(id, nome, capacidade, preco, qtd) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.preco = preco;
        this.qtd = qtd;
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

module.exports = MaterialEmbalagem;
