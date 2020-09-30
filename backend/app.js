const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const controllers = require('./controllers');
const {
    validateManipulado,
    validateOrcamento,
    validateLogin,
    validateSignup
} = require('./middleware/validators');
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

const public_folder = path.join(__dirname, 'public');

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');

app.use(express.static(public_folder));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser);

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

app.get('/fatores', controllers.getFatores);

app.get('/manipulado/all', controllers.manipuladoGetAll);

app.get('/manipulado/:manipuladoId', controllers.getManipulado);

app.post(
    '/manipulado',
    csrfProtection,
    validateManipulado,
    controllers.postManipulado
);

app.put(
    '/manipulado/edit/:manipuladoId',
    csrfProtection,
    validateManipulado,
    controllers.editManipulado
);

app.get('/orcamento/all', controllers.orcamentoGetAll);

app.get('/orcamento/:orcamentoId', controllers.getOrcamento);

app.post(
    '/orcamento',
    csrfProtection,
    validateOrcamento,
    controllers.postOrcamento
);

app.put(
    '/orcamento/edit/:orcamentoId',
    csrfProtection,
    controllers.editOrcamento
);

app.post('/logout', controllers.postLogout);

app.post(
    '/manipulado/delete/:manipuladoId',
    csrfProtection,
    controllers.postDeleteManipulado
);

app.post(
    '/orcamento/delete/:orcamentoId',
    csrfProtection,
    controllers.postDeleteOrcamento
);

module.exports = app;
