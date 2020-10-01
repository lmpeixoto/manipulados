const express = require('express');
const router = express.Router();

const utilsControllers = require('../controllers/utils.controllers');

router.get('/formasFarmaceuticas', utilsControllers.getFormasFarmaceuticas);

router.get('/fatores', utilsControllers.getFatores);

module.exports = router;
