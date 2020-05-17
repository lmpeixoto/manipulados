const formasFarmaceuticas = require('./model/formas-farmaceuticas.json');
const fatores = require('./model/unidades.json');
const OrcamentoManipulado = require('./model/manipulado')


exports.getIndex = (req, res, next) => {
    res.render('index');
}

exports.getOrcamento = (req, res, next) => {
    res.render('orcamento');

}

exports.postOrcamento = (req, res, next) => {
    const orcamentoManipulado = new OrcamentoManipulado({
        nomeManipulado: req.body.nomeManipulado,
        fatorF: req.body.fatorF,
        fFarmNome: req.body.fFarmNome,
        fFarmPrice: req.body.fFarmPrice,
        matPrimasPrice: req.body.matPrimasPrice,
        matEmbPrice: req.body.matEmbPrice,
        totalPrice: req.body.totalPrice,
        IVA: req.body.IVA,
        materiasPrimas: req.body.materiasPrimas,
        materiaisEmbalagem: req.body.materiaisEmbalagem
    });
    orcamentoManipulado.save()
        .then(result => {
            // console.log(result);
            console.log('Manipulado criado com sucesso');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });


}

exports.getNovo = (req, res, next) => {
    res.render('novo');
}

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
}

exports.getFatores = (req, res, next) => {
    res.send(fatores);
}