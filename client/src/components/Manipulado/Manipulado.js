import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import FORMAS_FARMACEUTICAS from '../../data/formas-farmaceuticas.json';
import MateriasPrimas from '../MateriasPrimas/MateriasPrimas';
import MateriaisEmbalagem from '../MateriaisEmbalagem/MateriaisEmbalagem';
import Validacoes from '../Validacoes/Validacoes';
import Calculos from '../Calculos/Calculos';

import { FATOR_F, patchManipulado, postManipulado } from '../../utils/api';
import {
    matEmbReader,
    matPrimReader,
    validacoesReader
} from '../../utils/readers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 195
    },

    gridContainer: {
        marginTop: '2rem'
    },
    titles: {
        marginTop: '2rem'
    },
    textInput: {
        width: '30%'
    },
    textArea: {
        width: '30%',
        marginTop: '15px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: '1rem'
    }
}));

const Manipulado = ({ editing, setEditing, loadedManipulado }) => {
    const classes = useStyles();
    const [nomeManipulado, setNomeManipulado] = useState('');
    const [loteManipulado, setLoteManipulado] = useState('');
    const [utenteNome, setUtenteNome] = useState('');
    const [utenteContacto, setUtenteContacto] = useState('');
    const [prescritorNome, setPrescritorNome] = useState('');
    const [prescritorContacto, setPrescritorContacto] = useState('');
    const [farmaceutico, setFarmaceutico] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [conservacao, setConservacao] = useState('');
    const [validade, setValidade] = useState(new Date('2020-01-18T21:11:54'));
    const [quantidade, setQuantidade] = useState('');
    const [formaFarmaceutica, setFormaFarmaceutica] = useState('');
    const [preparacao, setPreparacao] = useState('');
    const [formaFarmaceuticaPreco, setFormaFarmaceuticaPreco] = useState('');
    const [materiasPrimas, setMateriasPrimas] = useState([]);
    const [materiasPrimasPreco, setMateriasPrimasPreco] = useState('');
    const [materiaisEmbalagem, setMateriaisEmbalagem] = useState([]);
    const [materiaisEmbalagemPreco, setMateriaisEmbalagemPreco] = useState('');
    const [totais, setTotais] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [manipuladoId, setManipuladoID] = useState('');
    const [validacoes, setValidacoes] = useState([]);

    useEffect(() => {
        const populateManipuladoEdit = () => {
            if (loadedManipulado && editing) {
                setNomeManipulado(loadedManipulado.nomeManipulado);
                setLoteManipulado(loadedManipulado.lote);
                setUtenteNome(loadedManipulado.utenteNome);
                setUtenteContacto(loadedManipulado.utenteContacto);
                setPrescritorNome(loadedManipulado.prescritorNome);
                setPrescritorContacto(loadedManipulado.prescritorContacto);
                setFarmaceutico(loadedManipulado.farmaceutico);
                setSupervisor(loadedManipulado.supervisor);
                setConservacao(loadedManipulado.conservacao);
                setValidade(loadedManipulado.validade);
                setPreparacao(loadedManipulado.preparacao);
                setQuantidade(loadedManipulado.fFarmQtd);
                setFormaFarmaceutica(loadedManipulado.fFarmNome.toLowerCase());
                setMateriasPrimas(
                    matPrimReader(loadedManipulado.materiasPrimas)
                );
                setMateriaisEmbalagem(
                    matEmbReader(loadedManipulado.materiaisEmbalagem)
                );
                setValidacoes(validacoesReader(loadedManipulado.validacoes));
                setManipuladoID(loadedManipulado._id);
            }
        };

        populateManipuladoEdit();
        setLoading(false);
    }, []);

    let history = useHistory();

    const handleChange = (event) => {
        setFormaFarmaceutica(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleEditSaveButton = () => {
        let dataBody = {
            lote: loteManipulado,
            utenteNome,
            utenteContacto,
            prescritorNome,
            prescritorContacto,
            farmaceutico,
            supervisor,
            preparacao,
            conservacao,
            validade,
            fatorF: FATOR_F,
            fFarmPrice: formaFarmaceuticaPreco,
            nomeManipulado: nomeManipulado,
            fFarmNome: formaFarmaceutica,
            fFarmQtd: quantidade,
            materiasPrimas,
            materiasPrimasPrice: materiasPrimasPreco,
            materiaisEmbalagem,
            materiaisEmbalagemPrice: materiaisEmbalagemPreco,
            validacoes,
            IVA: totais[1],
            totalPrice: totais[0]
        };
        patchManipulado(manipuladoId, dataBody);
        setEditing(false);
        history.push('/arquivo');
    };

    const handleSaveButton = () => {
        let dataBody = {
            lote: loteManipulado,
            utenteNome,
            utenteContacto,
            prescritorNome,
            prescritorContacto,
            farmaceutico,
            supervisor,
            preparacao,
            conservacao,
            validade,
            fatorF: FATOR_F,
            fFarmPrice: formaFarmaceuticaPreco,
            nomeManipulado: nomeManipulado,
            fFarmNome: formaFarmaceutica,
            fFarmQtd: quantidade,
            materiasPrimas,
            materiasPrimasPrice: materiasPrimasPreco,
            materiaisEmbalagem,
            materiaisEmbalagemPrice: materiaisEmbalagemPreco,
            validacoes,
            IVA: totais[1],
            totalPrice: totais[0]
        };

        postManipulado(dataBody);
    };

    return (
        <Grid
            className={classes.gridContainer}
            container
            direction={'column'}
            spacing={1}
        >
            <Grid item>
                <Typography variant="h4">Manipulado</Typography>
            </Grid>
            <Grid item className={classes.titles}>
                <Typography variant="h6">Identificação</Typography>
            </Grid>
            <Grid item>
                <TextField
                    id="nome-manipulado"
                    label="Nome do Manipulado"
                    onChange={(e) => setNomeManipulado(e.target.value)}
                    className={classes.textInput}
                    value={nomeManipulado}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="lote"
                    label="Lote"
                    onChange={(e) => setLoteManipulado(e.target.value)}
                    className={classes.textInput}
                    value={loteManipulado}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="utenteNome"
                    label="Nome do Utente"
                    onChange={(e) => setUtenteNome(e.target.value)}
                    className={classes.textInput}
                    value={utenteNome}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="utenteContacto"
                    label="Contacto do Utente"
                    onChange={(e) => setUtenteContacto(e.target.value)}
                    className={classes.textInput}
                    value={utenteContacto}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="prescritorNome"
                    label="Nome do Prescritor"
                    onChange={(e) => setPrescritorNome(e.target.value)}
                    className={classes.textInput}
                    value={prescritorNome}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="prescritorContacto"
                    label="Contacto do Prescritor"
                    onChange={(e) => setPrescritorContacto(e.target.value)}
                    className={classes.textInput}
                    value={prescritorContacto}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="farmaceutico"
                    label="Farmacêutico Preparador"
                    onChange={(e) => setFarmaceutico(e.target.value)}
                    className={classes.textInput}
                    value={farmaceutico}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="supervisor"
                    label="Farmacêutico Supervisor"
                    onChange={(e) => setSupervisor(e.target.value)}
                    className={classes.textInput}
                    value={supervisor}
                />
            </Grid>
            <Grid item className={classes.titles}>
                <Typography variant="h6">Dados Técnicos</Typography>
            </Grid>
            <Grid item>
                <FormControl
                    className={(classes.formControl, classes.textInput)}
                >
                    <InputLabel id="forma-farmaceutica-select-label">
                        Forma Farmacêutica
                    </InputLabel>
                    <Select
                        labelId="forma-farmaceutica-select-label"
                        id="forma-farmaceutica-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={formaFarmaceutica}
                        onChange={handleChange}
                    >
                        {Object.keys(FORMAS_FARMACEUTICAS).map(
                            (formaFarmaceutica) => {
                                return (
                                    <MenuItem
                                        value={formaFarmaceutica}
                                        key={formaFarmaceutica}
                                    >
                                        {formaFarmaceutica}
                                    </MenuItem>
                                );
                            }
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <TextField
                    id="quantidade-manipulado"
                    label="Quantidade"
                    onChange={(e) => setQuantidade(e.target.value)}
                    className={classes.textInput}
                    value={quantidade}
                />
            </Grid>
            <Grid item>
                <TextareaAutosize
                    className={classes.textArea}
                    id="preparacao"
                    label="Preparação"
                    rowsMin={6}
                    placeholder="Preparação"
                    onChange={(e) => setPreparacao(e.target.value)}
                    value={preparacao}
                />
            </Grid>
            <Grid item>
                <TextareaAutosize
                    className={classes.textArea}
                    id="conservacao"
                    label="Conservação"
                    rowsMin={3}
                    placeholder="Conservação"
                    onChange={(e) => setConservacao(e.target.value)}
                    value={conservacao}
                />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item>
                    <KeyboardDatePicker
                        className={classes.textInput}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="validade"
                        label="Validade"
                        value={validade}
                        onChange={(date) => setValidade(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Grid item className={classes.gridContainer}>
                <MateriasPrimas
                    materiasPrimas={materiasPrimas}
                    setMateriasPrimas={setMateriasPrimas}
                />
            </Grid>
            <Grid item className={classes.gridContainer}>
                <MateriaisEmbalagem
                    materiaisEmbalagem={materiaisEmbalagem}
                    setMateriaisEmbalagem={setMateriaisEmbalagem}
                />
            </Grid>
            <Grid item className={classes.gridContainer}>
                <Validacoes
                    validacoes={validacoes}
                    setValidacoes={setValidacoes}
                />
            </Grid>
            <Grid item className={classes.gridContainer}>
                <Calculos
                    loading={loading}
                    setLoading={setLoading}
                    formaFarmaceutica={formaFarmaceutica}
                    formaFarmaceuticaPreco={formaFarmaceuticaPreco}
                    setFormaFarmaceuticaPreco={setFormaFarmaceuticaPreco}
                    materiasPrimas={materiasPrimas}
                    materiasPrimasPreco={materiasPrimasPreco}
                    setMateriasPrimasPreco={setMateriasPrimasPreco}
                    materiaisEmbalagem={materiaisEmbalagem}
                    materiaisEmbalagemPreco={materiaisEmbalagemPreco}
                    setMateriaisEmbalagemPreco={setMateriaisEmbalagemPreco}
                    quantidade={quantidade}
                    nomeManipulado={nomeManipulado}
                    handleEditSaveButton={handleEditSaveButton}
                    handleSaveButton={handleSaveButton}
                    totais={totais}
                    setTotais={setTotais}
                    editing={editing}
                />
            </Grid>
        </Grid>
    );
};

export default Manipulado;
