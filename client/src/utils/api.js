const URL_FATORES = 'http://localhost:5000/fatores';
const URL_FORMAS_FARMACEUTICAS = 'http://localhost:5000/formasFarmaceuticas';
const URL_POST_NOVO_ORCAMENTO = 'http://localhost:5000/orcamentos/novo';
const URL_GET_ORCAMENTOS = 'http://localhost:5000/orcamentos/all';

export const FATOR_F = 5.03;

export const fetchFatores = async () => {
    try {
        const fatoresResponse = await fetch(URL_FATORES);
        const fatoresData = await fatoresResponse.json();
        return fatoresData;
    } catch (error) {
        console.log(error);
    }
};

export const fetchFormasFarmaceuticas = async () => {
    try {
        const formasFarmaceuticasResponse = await fetch(
            URL_FORMAS_FARMACEUTICAS
        );
        const formasFarmaceuticasData = await formasFarmaceuticasResponse.json();
        return formasFarmaceuticasData;
    } catch (error) {
        console.log(error);
    }
};

export const postOrcamento = async (dataBody) => {
    try {
        const response = await fetch(URL_POST_NOVO_ORCAMENTO, {
            method: 'POST',
            body: JSON.stringify(dataBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

export const getOrcamentoAll = async () => {
    try {
        const response = await fetch(URL_GET_ORCAMENTOS);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};
