import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { getOrcamentoAll } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop: '2rem'
    },
    cards: {
        margin: '1rem 0.5rem'
    }
}));

const Arquivo = () => {
    const classes = useStyles();

    const [orcamentos, setOrcamentos] = useState([]);

    useEffect(() => {
        const getOrcamentos = async () => {
            const orcamentosData = await getOrcamentoAll();
            setOrcamentos(orcamentosData);
        };

        getOrcamentos();
    }, []);

    return (
        <Grid
            className={classes.gridContainer}
            container
            direction={'column'}
            spacing={1}
        >
            <Grid item>
                <Typography variant="h4">Arquivo:</Typography>
            </Grid>
            {orcamentos.map((orcamento) => {
                return (
                    <Card key={orcamento._id} className={classes.cards}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                <span>Nome:</span> {orcamento.nomeManipulado}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                <span>Preço:</span> {orcamento.totalPrice}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
        </Grid>
    );
};

export default Arquivo;
