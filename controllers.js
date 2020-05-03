const formasFarmaceuticas = require('./model/formas-farmaceuticas.json');
const fatores = require('./model/unidades.json');


exports.getIndex = (req, res, next) => {
    res.render('index');  
};

exports.getOrcamento = (req, res, next) => {
    res.render('orcamento', { formasFarmaceuticas });
};

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};

exports.getFatores = (req, res, next) => {
    res.send(fatores);
};