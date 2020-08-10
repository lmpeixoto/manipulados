const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { check, body } = require('express-validator');

const controllers = require('./controllers');
const {
    validateManipulado,
    validateOrcamento
} = require('./middleware/validators');

const app = express();

const public_folder = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.use(express.static(public_folder));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', controllers.getIndex);

app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

app.get('/fatores', controllers.getFatores);

app.get('/novoManipulado', controllers.getNovoManipulado);

app.post('/novoManipulado', validateManipulado, controllers.postNovoManipulado);

app.get('/orcamento', controllers.getOrcamento);

app.post('/orcamento', validateOrcamento, controllers.postOrcamento);

app.get('/pesquisa', controllers.getPesquisa);

app.get('/signup', controllers.getSignup);

app.get('/login', controllers.getLogin);

app.post(
    '/pesquisa',
    [body('search-query').isLength({ min: 5 }).isAlphanumeric().trim()],
    controllers.postPesquisa
);

app.get('/arquivo', controllers.getArquivo);

app.get('/editarManipulado', controllers.getEditManipulado);

app.post('/editarManipulado', controllers.postEditManipulado);

app.get('/verManipulado', controllers.getViewManipulado);

app.post('/verManipulado', controllers.postViewManipulado);

app.post('/deleteManipulado/:id', controllers.postDeleteManipulado);

module.exports = app;
