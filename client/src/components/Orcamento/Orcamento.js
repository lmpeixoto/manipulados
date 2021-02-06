import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FORMAS_FARMACEUTICAS from '../../data/formas-farmaceuticas.json';
import MateriasPrimas from '../MateriasPrimas/MateriasPrimas';
import MateriaisEmbalagem from '../MateriaisEmbalagem/MateriaisEmbalagem';
import Calculos from './Calculos/Calculos';

import './Orcamento.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        }
    }
}));

const Orcamento = () => {
    const classes = useStyles();

    const [formaFarmaceutica, setFormaFarmaceutica] = React.useState('');
    const [materiasPrimas, setMateriasPrimas] = React.useState([]);
    const [materiaisEmbalagem, setMateriaisEmbalagem] = React.useState([]);
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
        <div className="orcamento-container">
            <h1>Orçamento</h1>
            <div className={classes.root} autoComplete="+off">
                <TextField id="standard-basic" label="Nome" />
                <TextField id="standard-basic" label="Fator" />
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
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
                <TextField id="standard-basic" label="Quantidade" />
                <MateriasPrimas
                    materiasPrimas={materiasPrimas}
                    setMateriasPrimas={setMateriasPrimas}
                />
                <MateriaisEmbalagem
                    materiaisEmbalagem={materiaisEmbalagem}
                    setMateriaisEmbalagem={setMateriaisEmbalagem}
                />
                <Calculos
                    materiasPrimas={materiasPrimas}
                    materiaisEmbalagem={materiaisEmbalagem}
                />
            </div>
        </div>
    );
};

export default Orcamento;
