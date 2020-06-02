// @ts-check

import { ManipuladoUICtrl } from "../manipulado/ManipuladoUICtrl.js";

export const ValidCtrl = (function () {
  const Validacao = function (id, nomeEnsaio, especificacao, resultado) {
    this.id = id;
    this.nomeEnsaio = nomeEnsaio;
    this.especificacao = especificacao;
    this.resultado = resultado;
  };

  let ensaiosValidacao = [];

  let currentId;

  const addValidacao = () => {
    let id;

    if (currentId) {
      id = currentId;
    } else {
      id = 0;
      currentId = 0;
    }

    let ensaioValidacao = new Validacao(
      id,
      ManipuladoUICtrl.UISelectors.ensaioValidacao.value,
      ManipuladoUICtrl.UISelectors.especificacaoValidacao.value,
      ManipuladoUICtrl.UISelectors.resultadoValidacao.value
    );
    if (validateEnsaioValidacao(ensaioValidacao)) {
      ensaiosValidacao.push(ensaioValidacao);
      currentId += 1;
      ManipuladoUICtrl.displayValidacao(ensaioValidacao);
      ManipuladoUICtrl.deleteValidacaoFields();
    } else {
      alert("Um ou mais campos da validação estão em falta. Repita por favor!");
    }
  };

  const removeEnsaioValidacao = (e) => {
    let elementToRemove = e.target.parentNode;
    let indexToRemove = elementToRemove.id.split("-")[1];
    console.log(indexToRemove);
    let ensaiosValidacaoUpdated = ensaiosValidacao.filter(
      (valid) => parseInt(valid.id) !== parseInt(indexToRemove)
    );
    console.log(ensaiosValidacao);
    ensaiosValidacao = ensaiosValidacaoUpdated;
    ManipuladoUICtrl.deleteValidacaoItem(indexToRemove);
    console.log(ensaiosValidacao);
  };

  const getEnsaiosValidacao = () => {
    return ensaiosValidacao;
  };

  const validateEnsaioValidacao = (ensaioValidacao) => {
    if (
      ensaioValidacao.id !== null &&
      ensaioValidacao.nomeEnsaio &&
      ensaioValidacao.especificacao &&
      ensaioValidacao.resultado
    ) {
      return true;
    } else {
      return false;
    }
  };

  return {
    addValidacao,
    removeEnsaioValidacao,
    getEnsaiosValidacao,
    validateEnsaioValidacao,
  };
})();
