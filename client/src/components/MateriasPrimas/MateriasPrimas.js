import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import nextId from 'react-id-generator';

import FATORES from '../../data/fatores.json';
import './MateriasPrimas.css';

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
        width: '150px'
    },
    cardsIcons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const MateriasPrimas = ({ materiasPrimas, setMateriasPrimas }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [materiaPrima, setMateriaPrima] = useState({
        id: '',
        nome: '',
        preco: '',
        quantidade: '',
        fator: ''
    });

    const resetMateriaPrimaValues = () => {
        setMateriaPrima({
            id: '',
            nome: '',
            preco: '',
            quantidade: '',
            fator: ''
        });
    };

    const handleSelectChange = (event) => {
        setMateriaPrima({
            ...materiaPrima,
            fator: event.target.value
        });
        console.log(materiaPrima.fator);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleMateriaPrimaAdd = () => {
        setMateriasPrimas([
            ...materiasPrimas,
            { ...materiaPrima, id: nextId() }
        ]);
        resetMateriaPrimaValues();
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setMateriaPrima({
            ...materiaPrima,
            [event.target.name]: value
        });
    };

    const handleRemoveItem = (i) => {
        const matPrims = materiasPrimas.filter((element) => element.id !== i);
        setMateriasPrimas(matPrims);
    };

    const handleEditItem = (i) => {
        const [matPrim] = materiasPrimas.filter((element) => element.id === i);
        setMateriaPrima(matPrim);
        setEditForm(true);
    };

    const handleEditSave = () => {
        const newMateriasPrimas = materiasPrimas.filter(
            (element) => element.id !== materiaPrima.id
        );
        setMateriasPrimas([...newMateriasPrimas, materiaPrima]);
        setEditForm(false);
        resetMateriaPrimaValues();
    };

    return (
        <>
            <div
                className="materiasPrimasFormControl"
                onChange={handleInputChange}
            >
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Matérias Primas</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nome"
                            name="nome"
                            label="Nome"
                            value={materiaPrima.nome}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="preco"
                            name="preco"
                            label="Preço"
                            value={materiaPrima.preco}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="quantidade"
                            name="quantidade"
                            label="Quantidade"
                            value={materiaPrima.quantidade}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <FormControl
                            className={(classes.formControl, classes.textInput)}
                        >
                            <InputLabel id="fator-select-label">
                                Unidade
                            </InputLabel>
                            <Select
                                labelId="fator-select-label"
                                name="fator"
                                id="fator-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={materiaPrima.fator}
                                onChange={handleSelectChange}
                                required
                            >
                                {Object.keys(FATORES).map((fator) => {
                                    return (
                                        <MenuItem value={fator} key={fator}>
                                            {fator}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.button}>
                        {editForm ? (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleEditSave}
                            >
                                Guardar
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleMateriaPrimaAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>

            <div className={classes.cardsContainer}>
                {materiasPrimas.map((matPrim) => {
                    return (
                        <Card className={classes.cards} key={matPrim.id}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    <span>Nome:</span> {matPrim.nome}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <span>Preço:</span> {matPrim.preco}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Qt.:</span> {matPrim.quantidade}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <span>Fator:</span> {matPrim.fator}
                                </Typography>
                            </CardContent>
                            <div className={classes.cardsIcons}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => handleEditItem(matPrim.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(matPrim.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default MateriasPrimas;
