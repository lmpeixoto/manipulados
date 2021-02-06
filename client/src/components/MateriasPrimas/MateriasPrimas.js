import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import FATORES from '../../data/fatores.json';
import './MateriasPrimas.css';

const MateriasPrimas = ({ materiasPrimas, setMateriasPrimas }) => {
    const [open, setOpen] = useState(false);
    const [materiaPrima, setMateriaPrima] = useState({
        nome: '',
        preco: '',
        quantidade: '',
        fator: ''
    });

    const resetMateriaPrimaValues = () => {
        setMateriaPrima({
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

    const handleMateriaPrimaAdd = (event) => {
        event.preventDefault();
        setMateriasPrimas([...materiasPrimas, materiaPrima]);
        resetMateriaPrimaValues();
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setMateriaPrima({
            ...materiaPrima,
            [event.target.name]: value
        });
    };

    return (
        <form onChange={handleInputChange}>
            <h1>Matérias Primas</h1>

            <TextField
                id="nome"
                name="nome"
                label="Nome"
                value={materiaPrima.nome}
                required
            />
            <TextField
                id="preco"
                name="preco"
                label="Preço"
                value={materiaPrima.preco}
                required
            />
            <TextField
                id="quantidade"
                name="quantidade"
                label="Quantidade"
                value={materiaPrima.quantidade}
                required
            />
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
            <button
                type="button"
                aria-label="add"
                onClick={handleMateriaPrimaAdd}
            >
                Adicionar
            </button>

            <div className="materias-primas-summary">
                {materiasPrimas.map((matPrim) => {
                    return (
                        <Card>
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
                        </Card>
                    );
                })}
            </div>
        </form>
    );
};

export default MateriasPrimas;
