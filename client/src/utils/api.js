const URL_FATORES = 'http://localhost:5000/fatores';
const URL_FORMAS_FARMACEUTICAS = 'http://localhost:5000/formasFarmaceuticas';
const URL_POST_NOVO_ORCAMENTO = 'http://localhost:5000/orcamentos/novo';
const URL_GET_ORCAMENTOS = 'http://localhost:5000/orcamentos/all';
const URL_DEL_ORCAMENTO = 'http://localhost:5000/orcamentos/delete/';
const URL_PUT_ORCAMENTO = 'http://localhost:5000/orcamentos/edit/';

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

export const patchOrcamento = async (id, dataBody) => {
    console.log(dataBody);
    const url = URL_PUT_ORCAMENTO + id;
    try {
        const response = await fetch(url, {
            method: 'PUT',
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

export const deleteOrcamento = async (id) => {
    try {
        const response = await fetch(URL_DEL_ORCAMENTO + id, {
            method: 'DELETE',
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
