import nextId from 'react-id-generator';

export const matPrimReader = (matPrimArray) => {
    console.log(matPrimArray);
    let materiasPrimas = [];
    matPrimArray.forEach((matPrim) => {
        materiasPrimas.push({
            id: nextId(),
            nome: matPrim.nome,
            preco: matPrim.preco,
            qtd: matPrim.qtd,
            fator: matPrim.fator,
            valor: matPrim.valor
        });
    });
    return materiasPrimas;
};

export const matEmbReader = (matEmbArray) => {
    console.log(matEmbArray);
    let materiaisEmbalagem = [];
    matEmbArray.forEach((matEmb) => {
        materiaisEmbalagem.push({
            id: nextId(),
            nome: matEmb.nome,
            capacidade: matEmb.capacidade,
            preco: matEmb.preco,
            qtd: matEmb.qtd,
            valor: matEmb.valor
        });
    });
    return materiaisEmbalagem;
};
