const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orcamentoManipuladoSchema = new Schema({
    nomeManipulado: { type: String, required: true },
    fatorF: { type: Number, required: true },
    fFarmNome: { type: String, required: true },
    fFarmPrice: { type: Number, required: true },
    matPrimasPrice: { type: Number, required: true },
    matEmbPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    IVA: { type: Number, required: true },
    materiasPrimas: [{
        id: { type: Number, required: true },
        nome: { type: String, required: true },
        preco: { type: Number, required: true },
        qtd: { type: Number, required: true },
        fator: { type: String, required: true }
    }],
    materiaisEmbalagem: [{
        id: { type: Number, required: true },
        nome: { type: String, required: true },
        preco: { type: Number, required: true },
        qtd: { type: Number, required: true }
    }]

});


module.exports = mongoose.model('OrcamentoManipulado', orcamentoManipuladoSchema);