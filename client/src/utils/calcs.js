const URL_FATORES = 'http://localhost:5000/fatores';
const URL_FORMAS_FARMACEUTICAS = 'http://localhost:5000/formasFarmaceuticas';

export const FATOR_F = 5.03;

export const fetchFatores = async () => {
    const fatoresResponse = await fetch(URL_FATORES);
    const fatoresData = await fatoresResponse.json();
    return fatoresData;
};

export const fetchFormasFarmaceuticas = async () => {
    const formasFarmaceuticasResponse = await fetch(URL_FORMAS_FARMACEUTICAS);
    const formasFarmaceuticasData = await formasFarmaceuticasResponse.json();
    return formasFarmaceuticasData;
};

export const calcMateriasPrimasTotal = (matPrimas, fatores) => {
    let total = 0;
    matPrimas.forEach((element) => {
        const fator = +fatores[element.fator][1];
        total +=
            parseFloat(element.preco) *
            parseFloat(element.quantidade) *
            parseFloat(fator);
    });
    total = parseFloat(total.toFixed(2));
    return total;
};

export const calcMateriaisEmbalagemTotal = (matEmb) => {
    let total = 0;
    matEmb.forEach((element) => {
        total += parseFloat(element.preco) * parseFloat(element.quantidade);
    });
    total = parseFloat(total.toFixed(2));
    return total;
};

export const calcHonorarios = async (
    formaFarmaceutica,
    quantidade,
    formasFarmaceuticas
) => {
    let total = 0;
    const limite = await formasFarmaceuticas[formaFarmaceutica][0];
    const fator = await formasFarmaceuticas[formaFarmaceutica][1];
    const excesso = await formasFarmaceuticas[formaFarmaceutica][2];
    if (quantidade <= limite) {
        total = FATOR_F * fator;
    } else {
        let valorNormal = FATOR_F * fator;
        let quantidadeExtra = +quantidade - limite;
        let valorExtra = quantidadeExtra * FATOR_F * excesso;
        total = valorNormal + valorExtra;
    }
    total = parseFloat(total.toFixed(2));
    return total;
};

export const calcOrcamentoTotal = (
    totalHonorarios,
    totalMatPrim,
    totalMatEmb
) => {
    let incidenciaIVA = 1.3 * (+totalHonorarios + totalMatPrim + totalMatEmb);
    let IVA = 0.23 * incidenciaIVA;
    let total = +incidenciaIVA + IVA;
    console.log(total);
    console.log(IVA);
    total = parseFloat(total.toFixed(2));
    IVA = parseFloat(IVA.toFixed(2));
    return [total, IVA];
};
