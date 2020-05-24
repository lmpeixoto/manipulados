import { MatEmbCtrl } from './MatEmbCtrl.js';
import { MatPrimaCtrl } from './MatPrimaCtrl.js';
import { FormaFarmCtrl } from './FormaFarmCtrl.js';
import { OrcamentoUICtrl } from './OrcamentoUICtrl.js';


export const OrcamentoModel = (function () {
    let fatorF = 4;
    let nomeManipulado;
    let formaFarmaceutica;
    let matPrimasPrice;
    let matEmbPrice;
    let totalPrice;
    let IVA;

    const createObjectToSend = () => {
        let manipulado = {
            "nomeManipulado": nomeManipulado,
            "fatorF": fatorF,
            "fFarmNome": formaFarmaceutica.nome,
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
        if (nomeManipulado && formaFarmaceutica.nome && formaFarmaceutica.preco && formaFarmaceutica.qtd) {
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

    const calculateTotalPrice = () => {
        let fFarmPrice = (formaFarmaceutica.preco || 0);
        let matPrimPrice = (getMatPrimasPrice() || 0);
        let matEmbPrice = (getMatEmbPrice() || 0);
        let totalPrice = (fFarmPrice + matPrimPrice + matEmbPrice) * 1.3;
        let IVA = +((totalPrice * 0.023).toFixed(2));
        let finalPrice = +((totalPrice + IVA).toFixed(2));
        setTotalPrice(finalPrice);
        setIVA(IVA);
        return [finalPrice, IVA];
    };


    const getMatPrimasPrice = () => matPrimasPrice;
    const getMatEmbPrice = () => matEmbPrice;
    const getTotalPrice = () => totalPrice;
    const getIVA = () => IVA;
    const getFatorF = () => fatorF;
    const setNomeManipulado = (nome) => nomeManipulado = nome;
    const setMatPrimasPrice = (price) => matPrimasPrice = price;
    const setMatEmbPrice = (price) => matEmbPrice = price;
    const setIVA = (value) => IVA = value;
    const setTotalPrice = (price) => totalPrice = price;
    const setFormaFarm = (fFarm) => formaFarmaceutica = fFarm;

    return {

        calculateTotalPrice,
        createObjectToSend,
        saveOrcamentoData,
        getMatPrimasPrice,
        getMatEmbPrice,
        getTotalPrice,
        getIVA,
        getFatorF,
        setMatPrimasPrice,
        setMatEmbPrice,
        setIVA,
        setTotalPrice,
        setNomeManipulado,
        setFormaFarm,
        validateFormaFarmaceutica,
        validateMateriasPrimas,
        validateMateriaisEmb,
        validateBeforeSaving
    };
})();
