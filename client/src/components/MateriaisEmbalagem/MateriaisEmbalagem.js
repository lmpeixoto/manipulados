import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import nextId from 'react-id-generator';
import { makeStyles } from '@material-ui/core/styles';

import './MateriaisEmbalagem.css';

const useStyles = makeStyles((theme) => ({
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
        width: '200px'
    }
}));

const MateriaisEmbalagem = ({ materiaisEmbalagem, setMateriaisEmbalagem }) => {
    const classes = useStyles();
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

    const handleMateriaisEmbalagemAdd = (event) => {
        event.preventDefault();
        const newId = nextId();
        setMateriaisEmbalagem([
            ...materiaisEmbalagem,
            { ...materialEmbalagem, id: newId }
        ]);
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
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleMateriaisEmbalagemAdd}
                        >
                            Adicionar
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.cardsContainer}>
                {materiaisEmbalagem.map((matEmb) => {
                    return (
                        <Card id={matEmb.id} className={classes.cards}>
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
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default MateriaisEmbalagem;
