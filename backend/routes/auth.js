const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth.controllers');
const { validateLogin, validateSignup } = require('../middleware/validators');
const isAuth = require('../middleware/isAuth');

router.post('/login', validateLogin, authControllers.postLogin);

router.post('/signup', validateSignup, authControllers.postSignup);

router.post('/logout', isAuth, authControllers.postLogout);

module.exports = router;
