import React from 'react';

import {
    calcHonorarios,
    calcMateriasPrimasTotal,
    calcMateriaisEmbalagemTotal,
    calcOrcamentoTotal
} from '../../../utils/calcs';

const Calculos = ({
    formaFarmaceutica,
    materiasPrimas,
    materiaisEmbalagem,
    quantidade
}) => {
    const precoTotal = 0;
    if (
        formaFarmaceutica &&
        materiasPrimas.length > 0 &&
        materiaisEmbalagem.length > 0 &&
        quantidade
    ) {
        const precoHonorarios = calcHonorarios(formaFarmaceutica, quantidade);
        const precoMateriasPrimas = calcMateriasPrimasTotal(materiasPrimas);
        const precoMateriaisEmbalagem = calcMateriaisEmbalagemTotal(
            materiaisEmbalagem
        );
        precoTotal = calcOrcamentoTotal(
            precoHonorarios,
            precoMateriasPrimas,
            precoMateriaisEmbalagem
        );
    }

    return (
        <div>
            {formaFarmaceutica &&
            materiasPrimas &&
            materiaisEmbalagem &&
            quantidade ? (
                <p>{precoTotal}</p>
            ) : null}
        </div>
    );
};

export default Calculos;
