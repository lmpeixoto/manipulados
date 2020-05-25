const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManipuladoSchema = new Schema({
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
  materiasPrimas: [
    {
      id: { type: Number, required: true },
      nome: { type: String, required: true },
      preco: { type: Number, required: true },
      qtd: { type: Number, required: true },
      fator: { type: String, required: true },
    },
  ],
  materiaisEmbalagem: [
    {
      id: { type: Number, required: true },
      nome: { type: String, required: true },
      capacidade: { type: String, required: true },
      preco: { type: Number, required: true },
      qtd: { type: Number, required: true },
    },
  ],
  validacoes: [
    {
      id: { type: Number, required: true },
      nomeEnsaio: { type: String, required: true },
      especificacao: { type: String, required: true },
      resultado: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Manipulado", ManipuladoSchema);
