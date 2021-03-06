import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { styles } from './styles';

const useStyles = makeStyles((theme) => styles);

const ManipuladoItem = ({
    manipulados,
    handleEditManipulado,
    handleRemoveManipulado
}) => {
    const classes = useStyles();

    return (
        <div>
            {manipulados.length > 0 ? (
                <>
                    {manipulados.map((manipulado) => (
                        <Card key={manipulado._id} className={classes.cards}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <span>Nome:</span>{' '}
                                    {manipulado.nomeManipulado}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    <span>Preço:</span> {manipulado.totalPrice}
                                </Typography>
                            </CardContent>
                            <Grid item className={classes.cardsIcons}>
                                <IconButton
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() =>
                                        handleEditManipulado(manipulado._id)
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() =>
                                        handleRemoveManipulado(manipulado._id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Card>
                    ))}
                </>
            ) : (
                <h3>Não existem manipulados!</h3>
            )}
        </div>
    );
};

export default ManipuladoItem;
