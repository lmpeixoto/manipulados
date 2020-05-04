const fetchFormasFarmaceuticas = async () => {
  let response = await fetch("/formasFarmaceuticas");
  let data = await response.json();
  return data;
};

const fetchFatores = async () => {
  let response = await fetch("/fatores");
  let data = await response.json();
  return data;
};

const formaFarmaceuticaSelect = document.getElementById(
  "select-forma-farmaceutica"
);
const fatorSelect = document.getElementById("select-fator");
const addMatPrimaButton = document.getElementById("add-mat-prima-button");
const removeMatPrimaButton = document.querySelector(".rem-mat-prima-button");
const matPrimasSummaryList = document.getElementById("mat-primas-summary-list");


const materiasPrimas = [];

class MateriaPrima {
  constructor(nome, preco, qtd, fator) {
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
    this.fator = fator;
  }
}

addMatPrima = () => {
  nome = document.getElementById('nome-mat-prim').value;
  preco = document.getElementById('preco-mat-prim').value;
  qtd = document.getElementById('qtd-mat-prim').value;
  fator = document.getElementById('select-fator').value;
  matPrima = new MateriaPrima(nome, preco, qtd, fator);
  materiasPrimas.push(matPrima);
  index = materiasPrimas.indexOf(matPrima);
  console.log(matPrima);
  let html = `
                    <li>${matPrima.nome} <button type="button" class="rem-mat-prima-button" id="mat-prima-element-${index}><span class="glyphicon glyphicon-minus"></span>Remover</button>
    
                `;
  matPrimasSummaryList.innerHTML = html;
};


removeMatPrima = (e) => {
    console.log(e);
    
}

addMatPrimaButton.addEventListener("click", addMatPrima);
removeMatPrimaButton.addEventListener("click", removeMatPrima);

formaFarmaceuticaSelectPopulate = (fFarm) => {
  let formasFarmaceuticas = Object.keys(fFarm);
  formasFarmaceuticas.forEach((ff) => {
    let option = document.createElement("option");
    option.value = ff;
    option.text = ff;
    formaFarmaceuticaSelect.add(option);
  });
};

fatorSelectPopulate = (fatores) => {
  for (let fator in fatores) {
    let option = document.createElement("option");
    option.value = fator;
    option.text = fator;
    fatorSelect.add(option);
  }
};

fetchFormasFarmaceuticas().then((result) =>
  formaFarmaceuticaSelectPopulate(result)
);
fetchFatores().then((result) => fatorSelectPopulate(result));

// nome
// preço/unidade
// quantidade
// fator de peso

// mat de embalagem
