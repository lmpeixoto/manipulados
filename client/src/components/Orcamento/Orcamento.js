import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FORMAS_FARMACEUTICAS from '../../data/formas-farmaceuticas.json';

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
        <form className={classes.root} autoComplete="off">
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
                {Object.keys(FORMAS_FARMACEUTICAS).map((formaFarmaceutica) => {
                    return (
                        <MenuItem value={formaFarmaceutica}>
                            {formaFarmaceutica}
                        </MenuItem>
                    );
                })}
            </Select>
            <TextField id="standard-basic" label="Quantidade" />
            <TextField id="standard-basic" label="Preço" />
            <TextField id="standard-basic" label="Standard" />
            <TextField id="standard-basic" label="Standard" />
        </form>
    );
};

export default Orcamento;
