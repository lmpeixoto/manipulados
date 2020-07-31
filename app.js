const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { check, body } = require('express-validator/check');

const controllers = require('./controllers');
const app = express();
const port = 3000;
const MONGODB_URI = `mongodb+srv://sleepl:oMLvdUrSfsOlZY3w@cluster0-kwnmr.mongodb.net/test`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDB database connection established successfully');
});

const public_folder = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.use(express.static(public_folder));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', controllers.getIndex);

app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

app.get('/fatores', controllers.getFatores);

app.get('/novoManipulado', controllers.getNovoManipulado);

app.post('/novoManipulado', controllers.postNovoManipulado);

app.get('/orcamento', controllers.getOrcamento);

app.post('/orcamento', controllers.postOrcamento);

app.get('/pesquisa', controllers.getPesquisa);

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

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
