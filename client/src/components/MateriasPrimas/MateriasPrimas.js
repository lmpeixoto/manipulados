import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FATORES from '../../data/fatores.json';

const MateriasPrimas = () => {
    const classes = useStyles();

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch'
            }
        }
    }));

    const [fator, setFator] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setFator(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <form className={classes.root} autoComplete="off">
                <TextField id="nome" label="Nome" />
                <TextField id="preco" label="Preço" />
                <TextField id="quantidade" label="Quantidade" />
                <Select
                    labelId="fator-select-label"
                    id="fator-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={fator}
                    onChange={handleChange}
                >
                    {Object.keys(FATORES).map((fator) => {
                        return <MenuItem value={fator}>{fator}</MenuItem>;
                    })}
                </Select>
            </form>
        </div>
    );
};

export default MateriasPrimas;
