import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
    const [loadedOrcamento, setLoadedOrcamento] = useState({});

    useEffect(() => {
        const getOrcamentos = async () => {
            const orcamentosData = await getOrcamentoAll();
            setOrcamentos(orcamentosData);
        };

        getOrcamentos();
    }, []);

    const handleEditItem = (id) => {
        const [orcamentoToEdit] = orcamentos.filter(
            (orcamento) => orcamento._id === id
        );
        setLoadedOrcamento(orcamentoToEdit);
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
                <Orcamento
                    loadedOrcamento={loadedOrcamento}
                    editing={editing}
                />
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
