const fetchFormasFarmaceuticas = async () => {
    let response = await fetch('/formasFarmaceuticas');
    let data = await response.json();
    return data;
}



const formaFarmaceuticaSelect = document.getElementById('select-forma-farmaceutica');


formaFarmaceuticaSelectPopulate = (fFarm) => {
    let formasFarmaceuticas = Object.keys(fFarm)
    formasFarmaceuticas.forEach(ff => {
        let option = document.createElement('option');
        option.value = ff;
        option.text = ff;
        formaFarmaceuticaSelect.add(option);
    })
}

fetchFormasFarmaceuticas().then(result => formaFarmaceuticaSelectPopulate(result));