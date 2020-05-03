const fetchFormasFarmaceuticas = async () => {
    let response = await fetch('/formasFarmaceuticas');
    let data = await response.json();
    return data;
}

const fetchFatores = async () => {
    let response = await fetch('/fatores');
    let data = await response.json();
    return data;
}


const formaFarmaceuticaSelect = document.getElementById('select-forma-farmaceutica');
const fatorSelect = document.getElementById('select-fator');
const addMatPrimaButton = document.getElementById('add-mat-prima-button');
const matPrimasSummaryList = document.getElementById('mat-primas-summary-list');



addMatPrima = () => {
    let nome = document.getElementById('nome-mat-prim').value;
    let query = `
                    <li>${nome} <button type="button" class="rem-mat-prima-button"><span class="glyphicon glyphicon-minus"></span>Remover</button>
    
                `
    matPrimasSummaryList.innerHTML = query;
}

addMatPrimaButton.addEventListener('click', addMatPrima);



formaFarmaceuticaSelectPopulate = (fFarm) => {
    let formasFarmaceuticas = Object.keys(fFarm)
    formasFarmaceuticas.forEach(ff => {
        let option = document.createElement('option');
        option.value = ff;
        option.text = ff;
        formaFarmaceuticaSelect.add(option);
    })
}

fatorSelectPopulate = (fatores) => {
    for (let fator in fatores) {
        let option = document.createElement('option');
        option.value = fator;
        option.text = fator;
        fatorSelect.add(option);
    }
}

fetchFormasFarmaceuticas().then(result => formaFarmaceuticaSelectPopulate(result));
fetchFatores().then(result => fatorSelectPopulate(result));



// nome
// preço/unidade
// quantidade
// fator de peso


// mat de embalagem
