import { MatEmbCtrl } from './MatEmbCtrl.js';
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { OrcamentoUICtrl } from './OrcamentoUICtrl.js';


export const OrcamentoModel = (function () {
    let fatorF = 4;
    let nomeManipulado;
    let fFarmNome;
    let fFarmPrice;
    let matPrimasPrice;
    let matEmbPrice;
    let totalPrice;
    let IVA;
    const fetchFatores = async () => {
        let response = await fetch("/fatores");
        let data = await response.json();
        return data;
    };
    const fetchFormasFarmaceuticas = async () => {
        let response = await fetch("/formasFarmaceuticas");
        let data = await response.json();
        return data;
    };
    const calculateFormaFarmaceutica = (formasFarmaceuticas) => {
        let formaFarmaceuticaPrice;
        const fFarm = OrcamentoUICtrl.UISelectors.formaFarmNome.value;
        const qtd = OrcamentoUICtrl.UISelectors.formaFarmQtd.value;
        const limite = +(formasFarmaceuticas[fFarm][0]);
        const fatorNormal = +(formasFarmaceuticas[fFarm][1]);
        const fatorSuplemento = +(formasFarmaceuticas[fFarm][2]);
        if (qtd <= limite) {
            formaFarmaceuticaPrice = fatorF * fatorNormal;
        }
        else {
            let excesso = qtd - limite;
            formaFarmaceuticaPrice = (fatorF * fatorNormal) + (excesso * fatorSuplemento);
        }
        formaFarmaceuticaPrice = +(formaFarmaceuticaPrice.toFixed(2));
        setfFarmPrice(formaFarmaceuticaPrice);
        return formaFarmaceuticaPrice;
    };
    const calculateTotalPrice = () => {
        let fFarmPrice = (getfFarmPrice() || 0);
        let matPrimPrice = (getMatPrimasPrice() || 0);
        let matEmbPrice = (getMatEmbPrice() || 0);
        let totalPrice = (fFarmPrice + matPrimPrice + matEmbPrice) * 1.3;
        let IVA = +((totalPrice * 0.023).toFixed(2));
        let finalPrice = +((totalPrice + IVA).toFixed(2));
        setTotalPrice(finalPrice);
        setIVA(IVA);
        return [finalPrice, IVA];
    };
    const createObjectToSend = () => {
        let manipulado = {
            "nomeManipulado": nomeManipulado,
            "fatorF": fatorF,
            "fFarmNome": fFarmNome,
            "materiasPrimas": MatPrimaCtrl.getMatPrimas(),
            "materiaisEmbalagem": MatEmbCtrl.getMatEmb()
        };
        return manipulado;
    };
    const saveOrcamentoData = (e) => {
        e.preventDefault();
        if (validateBeforeSaving()) {
            fetch("/orcamento", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createObjectToSend())
            }).then((response) => {
                console.log(response);
            });
        }
        else {
            console.log('Data not saved!');
        }
    };
    const validateBeforeSaving = () => {
        console.log(validateFormaFarmaceutica() + ' ' + validateMateriasPrimas() + ' ' + validateMateriaisEmb());
        if (validateFormaFarmaceutica() && validateMateriasPrimas() && validateMateriaisEmb()) {
            console.log('Validated successfully!');
            return true;
        }
        else {
            alert('Um ou mais elementos não estão validados. Tente novamente!');
            return false;
        }
    };
    const validateFormaFarmaceutica = () => {
        if (nomeManipulado && fFarmNome) {
            return true;
        }
    };
    const validateMateriasPrimas = () => {
        if (MatPrimaCtrl.getMatPrimas().length > 0) {
            return true;
        }
    };
    const validateMateriaisEmb = () => {
        if (MatEmbCtrl.getMatEmb().length > 0) {
            return true;
        }
    };
    const getfFarmPrice = () => fFarmPrice;
    const getMatPrimasPrice = () => matPrimasPrice;
    const getMatEmbPrice = () => matEmbPrice;
    const getTotalPrice = () => totalPrice;
    const getIVA = () => IVA;
    const setNomeManipulado = (nome) => nomeManipulado = nome;
    const setfFarmPrice = (price) => fFarmPrice = price;
    const setMatPrimasPrice = (price) => matPrimasPrice = price;
    const setMatEmbPrice = (price) => matEmbPrice = price;
    const setIVA = (value) => IVA = value;
    const setTotalPrice = (price) => totalPrice = price;
    const setNomeFormaFarm = (fFarm) => fFarmNome = fFarm;
    return {
        fetchFormasFarmaceuticas,
        calculateFormaFarmaceutica,
        calculateTotalPrice,
        createObjectToSend,
        saveOrcamentoData,
        fetchFatores,
        getfFarmPrice,
        getMatPrimasPrice,
        getMatEmbPrice,
        getTotalPrice,
        getIVA,
        setfFarmPrice,
        setMatPrimasPrice,
        setMatEmbPrice,
        setIVA,
        setTotalPrice,
        setNomeManipulado,
        setNomeFormaFarm,
        validateFormaFarmaceutica,
        validateMateriasPrimas,
        validateMateriaisEmb,
        validateBeforeSaving
    };
})();
