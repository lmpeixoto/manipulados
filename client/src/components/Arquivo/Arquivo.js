import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getOrcamentoAll, deleteOrcamento } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop: '2rem'
    },
    cards: {
        margin: '1rem 0.5rem',
        width: '400px'
    },
    cardsIcons: {
        display: 'flex',
        justifyContent: 'flex-end'
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

    const handleEditItem = (id) => {};

    const handleRemoveItem = (id) => {
        deleteOrcamento(id);
        const newOrcamentosToSave = orcamentos.filter(
            (orcamento) => orcamento._id !== id
        );
        setOrcamentos(newOrcamentosToSave);
    };

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
                        <Grid item className={classes.cardsIcons}>
                            <IconButton
                                aria-label="edit"
                                color="primary"
                                onClick={() => handleEditItem(orcamento._id)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                color="secondary"
                                onClick={() => handleRemoveItem(orcamento._id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Card>
                );
            })}
        </Grid>
    );
};

export default Arquivo;
