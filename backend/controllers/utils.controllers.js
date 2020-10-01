const formasFarmaceuticas = require('../models/formas-farmaceuticas.json');
const fatores = require('../models/fatores.json');

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};

exports.getFatores = (req, res, next) => {
    res.send(fatores);
};
