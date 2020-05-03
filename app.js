const express = require('express');
const path = require('path');
const controllers = require('./controllers');
const app = express();
const port = 3000;

public_folder = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.use(express.static(public_folder));

app.get('/', controllers.getIndex);

app.get('/formasFarmaceuticas', controllers.getFormasFarmaceuticas);

app.get('/fatores', controllers.getFatores);

app.get('/orcamento', controllers.getOrcamento);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));