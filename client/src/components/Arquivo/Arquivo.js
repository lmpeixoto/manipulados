import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { getOrcamentoAll } from '../../utils/api';

const Arquivo = () => {
    const [orcamentos, setOrcamentos] = useState([]);

    useEffect(() => {
        const getOrcamentos = async () => {
            const orcamentosData = await getOrcamentoAll();
            setOrcamentos(orcamentosData);
            console.log('done');
        };
        return () => {
            getOrcamentos();
        };
    }, []);

    return (
        <Grid container direction={'column'} spacing={1}>
            {orcamentos.map((orcamento) => {
                return <p>orcamento</p>;
            })}
        </Grid>
    );
};

export default Arquivo;
