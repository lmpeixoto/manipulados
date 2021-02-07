import axios from 'axios';

const URL_FATORES = 'http://localhost:5000/fatores';
const URL_FORMAS_FARMACEUTICAS = 'http://localhost:5000/formasFarmaceuticas';
const FATOR_F = 5.03;

export const fetchFatores = () => {
    axios.get(URL_FATORES);
};

export const fetchFormasFarmaceuticas = async () => {
    await axios.get(URL_FORMAS_FARMACEUTICAS);
};

export const calcMateriasPrimasTotal = async (matPrimas) => {
    const total = 0;
    const fatores = await fetchFatores();
    matPrimas.forEach(async (element) => {
        const fator = await +fatores[element.fator][1];
        total +=
            parseFloat(element.preco) *
            parseFloat(element.quantidade) *
            parseFloat(fator);
    });
    return total;
};

export const calcMateriaisEmbalagemTotal = (matEmb) => {
    const total = 0;
    matEmb.forEach(async (element) => {
        total +=
            (await parseFloat(element.preco)) * parseFloat(element.quantidade);
    });
    return total;
};

export const calcHonorarios = async (formaFarmaceutica, quantidade) => {
    const formasFarmaceuticas = await fetchFormasFarmaceuticas();
    const total = 0;
    const limite = +formasFarmaceuticas[formaFarmaceutica][0];
    const fator = +formasFarmaceuticas[formaFarmaceutica][1];
    const excesso = +formasFarmaceuticas[formaFarmaceutica][2];
    if (quantidade <= limite) {
        total = FATOR_F * fator;
    } else {
        const valorNormal = FATOR_F * fator;
        const quantidadeExtra = +quantidade - limite;
        const valorExtra = quantidadeExtra * FATOR_F * excesso;
        total = valorNormal + valorExtra;
    }

    return total;
};

export const calcOrcamentoTotal = async (
    totalHonorarios,
    totalMatPrim,
    totalMatEmb
) => {
    const incidenciaIVA =
        (await 1.3) * (totalHonorarios + totalMatPrim + totalMatEmb);
    const IVA = 0.23 * incidenciaIVA;
    const total = incidenciaIVA + IVA;
    return [total, IVA];
};
