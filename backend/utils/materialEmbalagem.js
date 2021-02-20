class MaterialEmbalagem {
    constructor(nome, capacidade, preco, qtd, valor) {
        this.nome = nome;
        this.capacidade = capacidade;
        this.preco = preco;
        this.qtd = qtd;
        this.valor = valor;
    }

    calculateMatEmbPrice() {
        return +(this.preco * this.qtd).toFixed(2);
    }

    setMatEmbValor(valor) {
        this.valor = valor;
    }

    getMatEmbValor() {
        return this.valor;
    }
}

module.exports = MaterialEmbalagem;
