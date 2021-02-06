import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './MateriaisEmbalagem.css';

const MateriaisEmbalagem = ({ materiaisEmbalagem, setMateriaisEmbalagem }) => {
    const [materialEmbalagem, setMaterialEmbalagem] = useState({
        nome: '',
        preco: '',
        quantidade: ''
    });

    const resetMateriaisEmbalagemValues = () => {
        setMaterialEmbalagem({
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
        setMateriaisEmbalagem([...materiaisEmbalagem, materialEmbalagem]);
        resetMateriaisEmbalagemValues();
    };

    return (
        <form onChange={handleInputChange}>
            <h1>Materiais de Embalagem</h1>
            <div autoComplete="off">
                <TextField
                    id="nome"
                    name="nome"
                    label="Nome"
                    value={materialEmbalagem.nome}
                    required
                />
                <TextField
                    id="preco"
                    name="preco"
                    label="Preço"
                    value={materialEmbalagem.preco}
                    required
                />
                <TextField
                    id="quantidade"
                    name="quantidade"
                    label="Quantidade"
                    value={materialEmbalagem.quantidade}
                    required
                />
                <button
                    type="button"
                    aria-label="add"
                    onClick={handleMateriaisEmbalagemAdd}
                >
                    Adicionar
                </button>
            </div>
            <div className="materiais-embalagem-summary">
                {materiaisEmbalagem.map((matEmb) => {
                    return (
                        <Card>
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
        </form>
    );
};

export default MateriaisEmbalagem;
