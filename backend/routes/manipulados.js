const express = require('express');
const router = express.Router();

const manipuladoControllers = require('../controllers/manipulados.controllers');
const { validateManipulado } = require('../middleware/validators');
const isAuth = require('../middleware/isAuth');

router.get('/all', isAuth, manipuladoControllers.manipuladoGetAll);

router.get('/:manipuladoId', isAuth, manipuladoControllers.getManipulado);

router.post(
    '/novo',
    isAuth,
    validateManipulado,
    manipuladoControllers.postManipulado
);

router.put(
    '/edit/:manipuladoId',
    isAuth,
    validateManipulado,
    manipuladoControllers.editManipulado
);

router.delete(
    '/delete/:manipuladoId',
    isAuth,
    manipuladoControllers.postDeleteManipulado
);

module.exports = router;
