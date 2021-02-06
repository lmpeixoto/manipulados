import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './MateriaisEmbalagem.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        }
    }
}));

const MateriaisEmbalagem = ({ materiaisEmbalagem, setMateriaisEmbalagem }) => {
    const classes = useStyles();

    return (
        <div className="materiais-embalagem-container">
            <h1>Materiais de Embalagem</h1>
            <div className={classes.root} autoComplete="off">
                <TextField id="nome" label="Nome" />
                <TextField id="preco" label="Preço" />
                <TextField id="quantidade" label="Quantidade" />
                <IconButton aria-label="add">
                    <AddCircleOutlineIcon />
                </IconButton>
            </div>
            <div className="materiais-embalagem-summary"></div>
        </div>
    );
};

export default MateriaisEmbalagem;
