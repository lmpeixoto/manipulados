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

// app.use(csrfProtection);

// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

// app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

// app.get('/fatores', controllers.getFatores);

app.get('/manipulado/all', controllers.manipuladoGetAll);

app.get('/manipulado/:manipuladoId', controllers.getManipulado);

app.post('/manipulado', validateManipulado, controllers.postManipulado);

app.get('/orcamento/all', controllers.orcamentoGetAll);

app.put('/manipulado/edit/:manipuladoId', controllers.editManipulado);

app.get('/orcamento/:orcamentoId', controllers.getOrcamento);

app.post('/orcamento', validateOrcamento, controllers.postOrcamento);

app.put('/orcamento/edit/:orcamentoId', controllers.editOrcamento);

// app.post('/signup', validateSignup, controllers.postSignup);

// app.post('/login', validateLogin, controllers.postLogin);

// app.post('/logout', controllers.postLogout);

// app.post('/deleteManipulado/:id', isAuth, controllers.postDeleteManipulado);

module.exports = app;
