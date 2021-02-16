import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import nextId from 'react-id-generator';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import './MateriaisEmbalagem.css';

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

const MateriaisEmbalagem = ({ materiaisEmbalagem, setMateriaisEmbalagem }) => {
    const classes = useStyles();

    const [editForm, setEditForm] = useState(false);
    const [materialEmbalagem, setMaterialEmbalagem] = useState({
        id: '',
        nome: '',
        preco: '',
        quantidade: ''
    });

    const resetMateriaisEmbalagemValues = () => {
        setMaterialEmbalagem({
            id: '',
            nome: '',
            preco: '',
            quantidade: ''
        });
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setMaterialEmbalagem({
            ...materialEmbalagem,
            [event.target.name]: value
        });
    };

    const handleMateriaisEmbalagemAdd = () => {
        setMateriaisEmbalagem([
            ...materiaisEmbalagem,
            { ...materialEmbalagem, id: nextId() }
        ]);
        resetMateriaisEmbalagemValues();
    };

    const handleRemoveItem = (i) => {
        const matEmbs = materiaisEmbalagem.filter(
            (element) => element.id !== i
        );
        setMateriaisEmbalagem(matEmbs);
    };

    const handleEditItem = (i) => {
        const [matEmb] = materiaisEmbalagem.filter(
            (element) => element.id === i
        );
        setMaterialEmbalagem(matEmb);
        setEditForm(true);
    };

    const handleEditSave = () => {
        const newMateriaisEmbalagem = materiaisEmbalagem.filter(
            (element) => element.id !== materialEmbalagem.id
        );
        setMateriaisEmbalagem([...newMateriaisEmbalagem, materialEmbalagem]);
        setEditForm(false);
        resetMateriaisEmbalagemValues();
    };

    return (
        <>
            <div
                className="materiaisEmbalagemFormControl"
                onChange={handleInputChange}
            >
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">
                            Materiais de Embalagem
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nome"
                            name="nome"
                            label="Nome"
                            value={materialEmbalagem.nome}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="preco"
                            name="preco"
                            label="Preço"
                            value={materialEmbalagem.preco}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="quantidade"
                            name="quantidade"
                            label="Quantidade"
                            value={materialEmbalagem.quantidade}
                            className={classes.textInput}
                            required
                        />
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
                                onClick={handleMateriaisEmbalagemAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>
            <div className={classes.cardsContainer}>
                {materiaisEmbalagem.map((matEmb) => {
                    return (
                        <Card className={classes.cards} key={matEmb.id}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    <span>Nome:</span> {matEmb.nome}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <span>Preço:</span> {matEmb.preco}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Qt.:</span> {matEmb.quantidade}
                                </Typography>
                            </CardContent>
                            <div className={classes.cardsIcons}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => handleEditItem(matEmb.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(matEmb.id)}
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

export default MateriaisEmbalagem;