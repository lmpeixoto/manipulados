import React, { useEffect, useState } from 'react';

import './Calculos.css';
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
            Preço:
            {loading && <p>Em carregamento...</p>}
            {formaFarmaceutica &&
            materiasPrimas &&
            materiaisEmbalagem &&
            quantidade ? (
                <div className={'precoTotaisContainer'}>
                    <h5>Total:</h5>
                    <span>{totais[0]} €</span>
                    <h5>IVA:</h5>
                    <span>{totais[1]} €</span>
                </div>
            ) : null}
        </div>
    );
};

export default Calculos;
