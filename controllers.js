// @ts-check
const formasFarmaceuticas = require('./model/formas-farmaceuticas.json');
const fatores = require('./model/unidades.json');
const OrcamentoManipulado = require('./model/orcamentoManipulado');
const Manipulado = require('./model/manipulado');

exports.getIndex = (req, res, next) => {
    res.render('index');
};

exports.getOrcamento = (req, res, next) => {
    res.render('orcamento');
};

exports.postOrcamento = (req, res, next) => {
    console.log(req.body);
    const orcamentoManipulado = new OrcamentoManipulado({
        nomeManipulado: req.body.nomeManipulado,
        fatorF: req.body.fatorF,
        fFarmNome: req.body.fFarmNome,
        fFarmQtd: req.body.fFarmQtd,
        fFarmPrice: req.body.fFarmPreco,
        materiasPrimas: req.body.materiasPrimas,
        materiasPrimasPrice: req.body.materiasPrimasPrice,
        materiaisEmbalagem: req.body.materiaisEmbalagem,
        materiaisEmbalagemPrice: req.body.materiaisEmbalagemPrice,
        totalPrice: req.body.totalPrice,
        IVA: req.body.IVA
    });
    orcamentoManipulado
        .save()
        .then((result) => {
            console.log(orcamentoManipulado);
            console.log('Manipulado criado com sucesso');
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getNovoManipulado = (req, res, next) => {
    res.render('novoManipulado');
};

exports.postNovoManipulado = (req, res, next) => {
    console.log(req.body);
    const manipulado = new Manipulado({
        lote: req.body.lote,
        nomeManipulado: req.body.nomeManipulado,
        fatorF: req.body.fatorF,
        utenteNome: req.body.utenteNome,
        utenteContacto: req.body.utenteContacto,
        prescritorNome: req.body.prescritorNome,
        prescritorContacto: req.body.prescritorContacto,
        farmaceuticoNome: req.body.farmaceuticoNome,
        farmaceuticoSupervisor: req.body.farmaceuticoSupervisor,
        preparacao: req.body.preparacao,
        conservacao: req.body.conservacao,
        validade: req.body.validade,
        fFarmNome: req.body.fFarmNome,
        fFarmPrice: req.body.fFarmPrice,
        fFarmQtd: req.body.fFarmQtd,
        materiasPrimas: req.body.materiasPrimas,
        materiasPrimasPrice: req.body.materiasPrimasPrice,
        materiaisEmbalagem: req.body.materiaisEmbalagem,
        materiaisEmbalagemPrice: req.body.materiaisEmbalagemPrice,
        validacoes: req.body.validacoes,
        IVA: req.body.IVA,
        totalPrice: req.body.totalPrice
    });
    manipulado
        .save()
        .then((result) => {
            // console.log(result);
            console.log(manipulado);
            console.log('Manipulado criado com sucesso');
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getEditManipulado = (req, res, next) => {
    res.render('editarManipulado', { manipulado: undefined });
};

exports.postEditManipulado = (req, res, next) => {
    let manipuladoID = req.query.manipuladoID;
    Manipulado.findById(manipuladoID)
        .then((manipulado) => {
            res.render('editarManipulado', {
                manipulado: manipulado
            });
        })
        .catch((err) => console.log(err));
};

exports.getPesquisa = (req, res, next) => {
    res.render('pesquisa', { manipulados: undefined });
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.postPesquisa = (req, res, next) => {
    let searchQuery = req.body['search-query'];
    const regex = new RegExp(escapeRegex(searchQuery), 'gi');
    let searchChoice = req.body['search-choices'];
    let queryChoice;
    let find = {};
    switch (searchChoice) {
        case 'Nome':
            queryChoice = 'nomeManipulado';
            break;
        case 'Substância Ativa':
            queryChoice = 'Substância Ativa';
            break;
        case 'Forma Farmacêutica':
            queryChoice = 'fFarmNome';
            break;
        case 'Utente':
            queryChoice = 'utenteNome';
            break;
    }
    find[queryChoice] = regex;
    Manipulado.find(find)
        .then((manip) => {
            if (manip.length > 0) {
                res.render('pesquisa', { manipulados: manip });
            } else {
                res.render('pesquisa', { manipulados: '' });
            }
        })
        .catch((err) => console.log(err));
};

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};

exports.getFatores = (req, res, next) => {
    res.send(fatores);
};
