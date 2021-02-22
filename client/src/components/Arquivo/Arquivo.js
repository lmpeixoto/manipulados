import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';

import { getOrcamentoAll, deleteOrcamento } from '../../utils/api';
import ItemArquivo from './ItemArquivo/ItemArquivo';
import Orcamento from '../Orcamento/Orcamento';

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

    const [editing, setEditing] = useState(false);
    const [orcamentos, setOrcamentos] = useState([]);

    useEffect(() => {
        const getOrcamentos = async () => {
            const orcamentosData = await getOrcamentoAll();
            setOrcamentos(orcamentosData);
        };

        getOrcamentos();
    }, []);

    const handleEditItem = (id) => {
        setEditing(true);
    };

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
            {editing ? (
                <Orcamento />
            ) : (
                <ItemArquivo
                    orcamentos={orcamentos}
                    handleEditItem={handleEditItem}
                    handleRemoveItem={handleRemoveItem}
                />
            )}
        </Grid>
    );
};

export default Arquivo;
