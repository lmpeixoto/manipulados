const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const controllers = require('./controllers');
const isAuth = require('./middleware/is-auth');
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

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/', controllers.getIndex);

app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

app.get('/fatores', controllers.getFatores);

app.get('/novoManipulado', isAuth, controllers.getNovoManipulado);

app.post(
    '/novoManipulado',
    isAuth,
    validateManipulado,
    controllers.postNovoManipulado
);

app.get('/orcamento', isAuth, controllers.getOrcamento);

app.post('/orcamento', isAuth, validateOrcamento, controllers.postOrcamento);

app.get('/pesquisa', controllers.getPesquisa);

app.get('/signup', controllers.getSignup);

app.get('/login', controllers.getLogin);

app.post('/signup', validateSignup, controllers.postSignup);

app.post('/login', validateLogin, controllers.postLogin);

app.post('/logout', controllers.postLogout);

app.post('/pesquisa', controllers.postPesquisa);

app.get('/arquivo', controllers.getArquivo);

app.get('/editarManipulado', isAuth, controllers.getEditManipulado);

app.post('/editarManipulado', isAuth, controllers.postEditManipulado);

app.get('/verManipulado', isAuth, controllers.getViewManipulado);

app.post('/verManipulado', isAuth, controllers.postViewManipulado);

app.post('/deleteManipulado/:id', isAuth, controllers.postDeleteManipulado);

module.exports = app;
