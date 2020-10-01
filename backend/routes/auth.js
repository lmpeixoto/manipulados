const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const { validateLogin, validateSignup } = require('../middleware/validators');

router.post('/login', validateLogin, controllers.postLogin);

router.post('/signup', validateSignup, controllers.postSignup);

module.exports = router;
