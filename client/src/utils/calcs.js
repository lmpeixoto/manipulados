import { fatores } from './fatores';
import { formasFarmaceuticas } from './formas-farmaceuticas';

export const FATOR_F = 5.03;

export const calcMateriasPrimasTotal = (matPrimas) => {
    let total = 0;
    matPrimas.forEach((element) => {
        const fator = roundTwoDecimals(fatores[element.fator][1]);
        total +=
            roundTwoDecimals(element.preco) * parseFloat(element.qtd) * fator;
    });
    total = roundTwoDecimals(total);
    return total;
};

export const calcMateriaisEmbalagemTotal = (matEmb) => {
    let total = 0;
    matEmb.forEach((element) => {
        total += roundTwoDecimals(element.preco) * parseFloat(element.qtd);
    });
    total = roundTwoDecimals(total);
    return total;
};

export const calcHonorarios = async (formaFarmaceutica, quantidade) => {
    let total = 0;
    const limite = await formasFarmaceuticas[formaFarmaceutica][0];
    const fator = await formasFarmaceuticas[formaFarmaceutica][1];
    const excesso = await formasFarmaceuticas[formaFarmaceutica][2];
    if (quantidade <= limite) {
        total = FATOR_F * fator;
    } else {
        let valorNormal = roundTwoDecimals(FATOR_F * fator);
        let quantidadeExtra = roundTwoDecimals(+quantidade - limite);
        let valorExtra = roundTwoDecimals(quantidadeExtra * FATOR_F * excesso);
        total = roundTwoDecimals(valorNormal + valorExtra);
    }
    total = roundTwoDecimals(total);
    return total;
};

export const calcOrcamentoTotal = (
    totalHonorarios,
    totalMatPrim,
    totalMatEmb
) => {
    let incidenciaIVA = roundTwoDecimals(
        1.3 * roundTwoDecimals(+totalHonorarios + totalMatPrim + totalMatEmb)
    );
    let IVA = roundTwoDecimals(0.23 * incidenciaIVA);
    let total = roundTwoDecimals(+incidenciaIVA + IVA);
    total = roundTwoDecimals(total);
    IVA = roundTwoDecimals(IVA);
    return [total, IVA];
};

const roundTwoDecimals = (num) => {
    return parseFloat(num).toFixed(2);
};
