import React, { useEffect, useState } from 'react';

import {
    fetchFatores,
    fetchFormasFarmaceuticas,
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
    const [totais, setTotais] = useState([]);
    const [fatores, setFatores] = useState({});
    const [formasFarmaceuticas, setFormasFarmaceuticas] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const fatoresData = await fetchFatores();
            setFatores(fatoresData);
            const formasFarmaceuticasData = await fetchFormasFarmaceuticas();
            setFormasFarmaceuticas(formasFarmaceuticasData);
        };

        fetchData();
        setLoading(false);
    }, []);

    useEffect(() => {
        const calculateTotals = async () => {
            if (
                formaFarmaceutica &&
                materiasPrimas &&
                materiaisEmbalagem &&
                quantidade
            ) {
                const matPrimTotal = calcMateriasPrimasTotal(
                    materiasPrimas,
                    fatores
                );
                const matEmbTotal = calcMateriaisEmbalagemTotal(
                    materiaisEmbalagem
                );
                const calcHonorTotal = await calcHonorarios(
                    formaFarmaceutica,
                    quantidade,
                    formasFarmaceuticas
                );
                const orcamentoTotal = calcOrcamentoTotal(
                    calcHonorTotal,
                    matPrimTotal,
                    matEmbTotal
                );
                setTotais(orcamentoTotal);
            } else {
                setTotais([0, 0]);
            }
        };

        calculateTotals();
    }, [
        formaFarmaceutica,
        formasFarmaceuticas,
        quantidade,
        materiasPrimas,
        materiaisEmbalagem
    ]);

    return (
        <div>
            CALCULOS
            {loading && <p>Loading...</p>}
            {formaFarmaceutica &&
            materiasPrimas &&
            materiaisEmbalagem &&
            quantidade ? (
                <div>
                    <h1>Total:</h1>
                    <p>{totais[0]}</p>
                    <h1>IVA:</h1>
                    <p>{totais[1]}</p>
                </div>
            ) : null}
        </div>
    );
};

export default Calculos;
