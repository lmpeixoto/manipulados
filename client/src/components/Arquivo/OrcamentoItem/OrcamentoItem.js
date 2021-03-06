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

const OrcamentoItem = ({
    orcamentos,
    handleEditOrcamento,
    handleRemoveOrcamento
}) => {
    const classes = useStyles();
    return (
        <div>
            {orcamentos.length > 0 ? (
                <>
                    {orcamentos.map((orcamento) => (
                        <Card key={orcamento._id} className={classes.cards}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <span>Nome:</span>{' '}
                                    {orcamento.nomeManipulado}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    <span>Preço:</span> {orcamento.totalPrice}
                                </Typography>
                            </CardContent>
                            <Grid item className={classes.cardsIcons}>
                                <IconButton
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() =>
                                        handleEditOrcamento(orcamento._id)
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    color="secondary"
                                    onClick={() =>
                                        handleRemoveOrcamento(orcamento._id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Card>
                    ))}{' '}
                </>
            ) : (
                <h3>Não existem orçamentos!</h3>
            )}
        </div>
    );
};

export default OrcamentoItem;
