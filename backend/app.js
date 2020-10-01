const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const authRoutes = require('./routes/auth');
const controllers = require('./controllers');
const isAuth = require('./middleware/isAuth');
const {
    validateManipulado,
    validateOrcamento
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

app.use('/auth', authRoutes);

app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

app.get('/fatores', controllers.getFatores);

app.get('/manipulado/all', isAuth, controllers.manipuladoGetAll);

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
