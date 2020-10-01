const express = require('express');
const router = express.Router();

const orcamentoControllers = require('../controllers/orcamentos.controllers');
const { validateOrcamento } = require('../middleware/validators');

router.get('/all', orcamentoControllers.orcamentoGetAll);

router.get('/:orcamentoId', orcamentoControllers.getOrcamento);

router.post('/novo', validateOrcamento, orcamentoControllers.postOrcamento);

router.put(
    '/edit/:orcamentoId',
    validateOrcamento,
    orcamentoControllers.editOrcamento
);

router.delete('/delete/:orcamentoId', orcamentoControllers.postDeleteOrcamento);

module.exports = router;
