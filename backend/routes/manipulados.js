const express = require('express');
const router = express.Router();

const manipuladoControllers = require('../controllers/manipulados.controllers');
const { validateManipulado } = require('../middleware/validators');
const isAuth = require('../middleware/isAuth');

router.get('/all', manipuladoControllers.manipuladoGetAll);

router.get('/:manipuladoId', manipuladoControllers.getManipulado);

router.post('/novo', validateManipulado, manipuladoControllers.postManipulado);

router.put(
    '/edit/:manipuladoId',
    validateManipulado,
    manipuladoControllers.editManipulado
);

router.delete(
    '/delete/:manipuladoId',
    manipuladoControllers.postDeleteManipulado
);

module.exports = router;
