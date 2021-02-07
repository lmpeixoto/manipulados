import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FORMAS_FARMACEUTICAS from '../../data/formas-farmaceuticas.json';
import MateriasPrimas from '../MateriasPrimas/MateriasPrimas';
import MateriaisEmbalagem from '../MateriaisEmbalagem/MateriaisEmbalagem';
import Calculos from './Calculos/Calculos';

import './Orcamento.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 195
    }
}));

const Orcamento = () => {
    const classes = useStyles();

    const [nomeOrcamento, setNomeOrcamento] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [formaFarmaceutica, setFormaFarmaceutica] = React.useState('');
    const [materiasPrimas, setMateriasPrimas] = React.useState([]);
    const [materiaisEmbalagem, setMateriaisEmbalagem] = React.useState([]);
    const [preco, setPreco] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setFormaFarmaceutica(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Grid container direction={'column'} spacing={1}>
                <Grid item>
                    <Typography variant="h4">Orçamento</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Nome"
                        onChange={(e) => setNomeOrcamento(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="forma-farmaceutica-select-label">
                            Forma farmacêutica
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
                        id="standard-basic"
                        label="Quantidade"
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <MateriasPrimas
                        materiasPrimas={materiasPrimas}
                        setMateriasPrimas={setMateriasPrimas}
                    />
                </Grid>
                <Grid item>
                    <MateriaisEmbalagem
                        materiaisEmbalagem={materiaisEmbalagem}
                        setMateriaisEmbalagem={setMateriaisEmbalagem}
                    />
                </Grid>
                <Grid item>
                    <Calculos
                        formaFarmaceutica={formaFarmaceutica}
                        materiasPrimas={materiasPrimas}
                        materiaisEmbalagem={materiaisEmbalagem}
                        quantidade={quantidade}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Orcamento;
