const { validationResult } = require('express-validator');

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
    res.render('novoManipulado', { errorMessage: '' });
};

exports.postNovoManipulado = (req, res, next) => {
    const { errors } = validationResult(req);
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
    if (errors.length > 0) {
        res.render('editarManipulado', {
            manipulado: manipulado,
            errorMessage: errors[0].msg
        });
    } else {
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
    }
};

exports.getEditManipulado = (req, res, next) => {
    res.render('editarManipulado', { manipulado: undefined });
};

exports.postEditManipulado = (req, res, next) => {
    let manipuladoID = req.query.manipuladoID;
    Manipulado.findById(manipuladoID)
        .then((manipulado) => {
            if (manipulado) {
                res.render('editarManipulado', {
                    manipulado: manipulado
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.getViewManipulado = (req, res, next) => {
    let manipuladoID = req.query.manipuladoID;
    Manipulado.findById(manipuladoID)
        .then((manipulado) => {
            if (manipulado) {
                res.render('ver-manipulado', {
                    manipulado: manipulado
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.postViewManipulado = (req, res, next) => {
    let manipuladoID = req.query.manipuladoID;
    Manipulado.findById(manipuladoID)
        .then((manipulado) => {
            if (manipulado) {
                res.render('ver-manipulado', {
                    manipulado: manipulado
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.postDeleteManipulado = (req, res, next) => {
    let manipuladoID = req.params.id;
    console.log(req.params);
    Manipulado.findByIdAndDelete(manipuladoID, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Manipulado apagado com sucesso!');
            res.redirect('/arquivo');
        }
    });
};

exports.getPesquisa = (req, res, next) => {
    res.render('pesquisa', { manipulados: null, errorMessage: null });
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.postPesquisa = (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
        res.render('pesquisa', {
            manipulados: '',
            errorMessage: errors[0].msg
        });
    } else {
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
                    res.render('pesquisa', {
                        manipulados: '',
                        errorMessage: 'Resultado de pesquisa não encontrado!'
                    });
                }
            })
            .catch((err) => console.log(err));
    }
};

exports.getArquivo = (req, res, next) => {
    Manipulado.find()
        .then((resultado) => {
            res.render('arquivo', {
                resultado: resultado
            });
        })
        .catch((err) => console.log(err));
};

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};

exports.getFatores = (req, res, next) => {
    res.send(fatores);
};
