const formasFarmaceuticas = require('./model/formas-farmaceuticas.json');


exports.getIndex = (req, res, next) => {
    res.render('index');  
};

exports.getOrcamento = (req, res, next) => {
    res.render('orcamento', { formasFarmaceuticas });
};

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};