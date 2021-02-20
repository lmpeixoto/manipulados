// @ts-check

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManipuladoSchema = new Schema(
    {
        lote: { type: String, required: true },
        nomeManipulado: { type: String, required: true },
        fatorF: { type: Number, required: true },
        utenteNome: { type: String, required: true },
        utenteContacto: { type: Number, required: true },
        prescritorNome: { type: String, required: true },
        prescritorContacto: { type: Number, required: true },
        farmaceuticoNome: { type: String, required: true },
        farmaceuticoSupervisor: { type: String, required: true },
        preparacao: { type: String, required: true },
        conservacao: { type: String, required: true },
        validade: { type: String, required: true },
        fFarmNome: { type: String, required: true },
        fFarmPrice: { type: Number, required: true },
        fFarmQtd: { type: Number, required: true },
        materiasPrimas: [
            {
                nome: { type: String, required: true },
                preco: { type: Number, required: true },
                qtd: { type: Number, required: true },
                fator: { type: String, required: true },
                valor: { type: Number, required: true }
            }
        ],
        materiasPrimasPrice: { type: Number, required: true },
        materiaisEmbalagem: [
            {
                nome: { type: String, required: true },
                capacidade: { type: String, required: true },
                preco: { type: Number, required: true },
                qtd: { type: Number, required: true },
                valor: { type: Number, required: true }
            }
        ],
        materiaisEmbalagemPrice: { type: Number, required: true },
        validacoes: [
            {
                nomeEnsaio: { type: String, required: true },
                especificacao: { type: String, required: true },
                resultado: { type: String, required: true }
            }
        ],
        IVA: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model('Manipulado', ManipuladoSchema);
