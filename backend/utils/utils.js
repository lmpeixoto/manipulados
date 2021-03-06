const MateriaPrima = require('./materiaPrima');
const MaterialEmbalagem = require('./materialEmbalagem');
const Validacao = require('./validacao');

exports.matPrimReader = (matPrimArray) => {
    console.log(matPrimArray);
    let materiasPrimas = [];
    matPrimArray.forEach((matPrim) => {
        materiasPrimas.push(
            new MateriaPrima(
                matPrim.nome,
                matPrim.preco,
                matPrim.qtd,
                matPrim.fator,
                matPrim.valor
            )
        );
    });
    return materiasPrimas;
};

exports.matEmbReader = (matEmbArray) => {
    console.log(matEmbArray);
    let materiaisEmbalagem = [];
    matEmbArray.forEach((matEmb) => {
        materiaisEmbalagem.push(
            new MaterialEmbalagem(
                matEmb.nome,
                matEmb.capacidade,
                matEmb.preco,
                matEmb.qtd,
                matEmb.valor
            )
        );
    });
    return materiaisEmbalagem;
};

exports.validacoesReader = (validsArray) => {
    console.log(validsArray);
    let validacoes = [];
    validsArray.forEach((valid) => {
        validacoes.push(
            new Validacao(
                valid.nomeEnsaio,
                valid.especificacao,
                valid.resultado
            )
        );
    });
    return validacoes;
};

exports.roundNumberToTwoDecimals = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

exports.calcularTotaisOjecto = (objecto) => {
    console.log(objecto);
    objecto.calculateIVA();
    objecto.calculateTotalPrice();
    return objecto;
};
