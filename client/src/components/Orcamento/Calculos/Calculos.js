import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

import './Calculos.css';
import {
    calcHonorarios,
    calcMateriasPrimasTotal,
    calcMateriaisEmbalagemTotal,
    calcOrcamentoTotal
} from '../../../utils/calcs';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        margin: 0
    },
    button: {
        marginTop: '1rem'
    },
    formControl: {
        minWidth: 195
    },
    textInput: {
        width: '30%'
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
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

const Calculos = ({
    editing,
    loading,
    formaFarmaceutica,
    setFormaFarmaceuticaPreco,
    materiasPrimas,
    setMateriasPrimasPreco,
    materiaisEmbalagem,
    setMateriaisEmbalagemPreco,
    quantidade,
    handleEditSaveButton,
    handleSaveButton,
    totais,
    setTotais
}) => {
    useEffect(() => {
        const calculateTotals = async () => {
            if (
                formaFarmaceutica &&
                materiasPrimas &&
                materiaisEmbalagem &&
                quantidade
            ) {
                const matPrimTotal = calcMateriasPrimasTotal(materiasPrimas);
                setMateriasPrimasPreco(matPrimTotal);
                const matEmbTotal = calcMateriaisEmbalagemTotal(
                    materiaisEmbalagem
                );
                setMateriaisEmbalagemPreco(matEmbTotal);
                const calcHonorTotal = await calcHonorarios(
                    formaFarmaceutica,
                    quantidade
                );
                setFormaFarmaceuticaPreco(calcHonorTotal);
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
    }, [formaFarmaceutica, quantidade, materiasPrimas, materiaisEmbalagem]);

    const classes = useStyles();

    return (
        <>
            {loading && <p>Em carregamento...</p>}
            {formaFarmaceutica &&
            materiasPrimas &&
            materiaisEmbalagem &&
            quantidade &&
            totais ? (
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Preço</Typography>
                    </Grid>
                    <Card className={classes.cards}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                <span>Preço:</span> {totais[0]}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                <span>IVA:</span> {totais[1]}
                            </Typography>
                        </CardContent>
                        <div className={classes.cardsIcons}>
                            {editing ? (
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    onClick={handleEditSaveButton}
                                >
                                    Atualizar <SaveIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    onClick={handleSaveButton}
                                >
                                    Guardar <SaveIcon />
                                </IconButton>
                            )}
                        </div>
                    </Card>
                </Grid>
            ) : null}
        </>
    );
};

export default Calculos;
