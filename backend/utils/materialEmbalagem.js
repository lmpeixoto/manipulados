class MaterialEmbalagem {
    constructor(id, nome, capacidade, preco, qtd) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.preco = preco;
        this.qtd = qtd;
        this.valor;
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
