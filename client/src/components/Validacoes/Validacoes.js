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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    textArea: {
        width: '30%',
        marginTop: '15px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: '1rem'
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    cards: {
        margin: '1rem 0.5rem',
        width: '200px'
    },
    cardsIcons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const Validacoes = ({ validacoes, setValidacoes }) => {
    const classes = useStyles();

    const [editForm, setEditForm] = useState(false);
    const [validacao, setValidacao] = useState({
        id: '',
        nomeEnsaio: '',
        especificacao: '',
        resultado: ''
    });

    const [open, setOpen] = useState(false);

    const resetValidacaoValues = () => {
        setValidacao({
            id: '',
            nomeEnsaio: '',
            especificacao: '',
            resultado: ''
        });
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setValidacao({
            ...validacao,
            [event.target.name]: value
        });
    };

    const handleValidacaoAdd = () => {
        setValidacoes([...validacoes, { ...validacao, id: nextId() }]);
        resetValidacaoValues();
    };

    const handleRemoveItem = (i) => {
        const valids = validacoes.filter((element) => element.id !== i);
        setValidacoes(valids);
    };

    const handleEditItem = (i) => {
        const [valid] = validacoes.filter((element) => element.id === i);
        setValidacao(valid);
        setEditForm(true);
    };

    const handleEditSave = () => {
        const newValidacoes = validacoes.filter(
            (element) => element.id !== validacao.id
        );
        setValidacoes([...newValidacoes, validacao]);
        setEditForm(false);
        resetValidacaoValues();
    };

    const handleSelectChange = (event) => {
        setValidacao({
            ...validacao,
            aprovacao: event.target.value
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <div className="validacoesFormControl" onChange={handleInputChange}>
                <Grid container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Validacões</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nome-valid"
                            name="nomeEnsaio"
                            label="Nome do ensaio"
                            value={validacao.nomeEnsaio}
                            className={classes.textInput}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextareaAutosize
                            className={classes.textArea}
                            id="especificacao"
                            name="especificacao"
                            label="Especificação"
                            rowsMin={3}
                            placeholder="Especificação"
                            value={validacao.especificacao}
                        />
                    </Grid>
                    <Grid item>
                        <InputLabel id="aprovacao-select-label">
                            Aprovação
                        </InputLabel>
                        <Select
                            className={classes.textInput}
                            labelId="aprovacao-select-label"
                            id="aprovacao-select"
                            name="aprovacao"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={validacao.resultado}
                            onChange={handleSelectChange}
                        >
                            <MenuItem key={1} value="aprovado">
                                Aprovado
                            </MenuItem>
                            <MenuItem key={0} value="não aprovado">
                                Não Aprovado
                            </MenuItem>
                        </Select>
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
                                onClick={handleValidacaoAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>
            <div className={classes.cardsContainer}>
                {validacoes.map((valid) => {
                    console.log(validacoes);
                    return (
                        <Card className={classes.cards} key={valid.id}>
                            <CardContent>
                                <Typography variant="h5" component="h1">
                                    <span>Nome:</span> {valid.nomeEnsaio}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Descrição:</span>{' '}
                                    {valid.especificacao}
                                </Typography>
                                <Typography color="textSecondary">
                                    <span>Aprovação:</span> {valid.resultado}
                                </Typography>
                            </CardContent>
                            <div className={classes.cardsIcons}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => handleEditItem(valid.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(valid.id)}
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

export default Validacoes;
