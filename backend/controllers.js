const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const formasFarmaceuticas = require('./model/formas-farmaceuticas.json');
const fatores = require('./model/unidades.json');
const OrcamentoManipulado = require('./model/orcamentoManipulado');
const ManipuladoModel = require('./model/manipulado');
const Manipulado = require('./backend/utils/manipulado');
const User = require('./model/user');

exports.getOrcamento = async (req, res, next) => {
    const { orcamentoId } = req.params;
    const [errOrcamento, orcamento] = await OrcamentoManipulado.findOne({
        id: orcamentoId
    });
    if (errOrcamento) {
        console.log(errOrcamento);
    }
    if (orcamento) {
        res.status(200).json({
            orcamento
        });
    }
};

exports.postOrcamento = (req, res, next) => {
    console.log(req.body);
    const { errors } = validationResult(req);
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
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.json({
            manipulado: orcamentoManipulado,
            errorMessages: errorsArray
        });
    } else {
        orcamentoManipulado
            .save()
            .then((result) => {
                console.log(orcamentoManipulado);
                console.log('Manipulado criado com sucesso');
                res.json({
                    manipulado: orcamentoManipulado,
                    errorMessages: ''
                });
            })
            .catch((err) => {
                res.status(200).json({
                    manipulado: orcamentoManipulado,
                    errorMessages: [
                        'Ocorreu um erro a gravar para a base de dados!'
                    ]
                });
            });
    }
};

exports.postNovoManipulado = (req, res, next) => {
    const { errors } = validationResult(req);
    console.log(req.body.nomeManipulado);
    const manipuladoClassData = new Manipulado(
        req.body.lote,
        req.body.nomeManipulado,
        req.body.fatorF,
        req.body.utenteNome,
        req.body.utenteContacto,
        req.body.prescritorNome,
        req.body.prescritorContacto,
        req.body.farmaceuticoNome,
        req.body.farmaceuticoSupervisor,
        req.body.preparacao,
        req.body.conservacao,
        req.body.validade,
        req.body.fFarmNome,
        req.body.fFarmQtd,
        req.body.materiasPrimas,
        req.body.materiaisEmbalagem,
        req.body.validacoes
    );
    manipuladoClassData.calculateTotalPrice();
    console.log(manipuladoClassData);
    const manipulado = new ManipuladoModel({
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
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.status(400).json({
            errorMessages: errorsArray
        });
    } else {
        manipulado
            .save()
            .then((result) => {
                // console.log(result);
                console.log(manipulado);
                console.log('Manipulado criado com sucesso');
                res.status(200).json({
                    manipulado: manipulado,
                    errorMessages: ''
                });
            })
            .catch((err) => {
                res.status(400).json({
                    errorMessages: [
                        'Ocorreu um erro a gravar para a base de dados!'
                    ]
                });
            });
    }
};

exports.postEditManipulado = (req, res, next) => {
    let manipuladoID = req.query.manipuladoID;
    let { updatedManipulado } = req.body;
    ManipuladoModel.updateOne({"id":manipuladoID, updatedManipulado)
        .then((manipulado) => {
            if (manipulado) {
                res.status(200).json(manipulado);
            }
        })
        .catch((err) => res.status(400).json(err));
};

exports.getViewManipulado = (req, res, next) => {
    const manipuladoID = req.query.manipuladoID;
    ManipuladoModel.findById(manipuladoID)
        .then((manipulado) => {
            if (manipulado) {
                res.status(200).json(manipulado);
            }
        })
        .catch((err) =>
            res.status(400).json({
                err
            })
        );
};

exports.postDeleteManipulado = (req, res, next) => {
    let manipuladoID = req.params.id;
    console.log(req.params);
    ManipuladoModel.findByIdAndDelete(manipuladoID, (err, doc) => {
        if (err) {
            res.status(400).json(err);
        } else {
            console.log('Manipulado apagado com sucesso!');
            res.status(200).json(doc);
        }
    });
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.postPesquisa = (req, res, next) => {
    let searchQuery = req.body['search-query'];
    const regex = new RegExp(escapeRegex(searchQuery), 'gi');
    let searchChoice = req.body['search-choices'];
    let radioManipulado = req.body.manipulado;
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
    }
    find[queryChoice] = regex;
    if (radioManipulado === 'orçamento') {
        OrcamentoManipulado.find(find)
            .then((manip) => {
                if (manip.length > 0) {
                    return res.render('pesquisa', { manipulados: manip });
                } else {
                    return res.render('pesquisa', {
                        manipulados: '',
                        errorMessage: 'Resultado de pesquisa não encontrado!'
                    });
                }
            })
            .catch((err) => console.log(err));
    }
    ManipuladoModel.find(find)
        .then((manip) => {
            if (manip.length > 0) {
                return res.render('pesquisa', { manipulados: manip });
            } else {
                return res.render('pesquisa', {
                    manipulados: '',
                    errorMessage: 'Resultado de pesquisa não encontrado!'
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.getManipulados = (req, res, next) => {
    ManipuladoModel.find()
        .then((resultado) => {
            res.status(200).json({
                resultado
            });
        })
        .catch((err) => res.status(400).json(err));
};

exports.getSignup = (req, res, next) => {
    res.render('signup', { errorMessages: null });
};

exports.getLogin = (req, res, next) => {
    res.render('login', { errorMessages: null });
};

exports.postSignup = (req, res, next) => {
    const { errors } = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const primeiroNome = req.body.primeiroNome;
    const apelido = req.body.apelido;
    if (password !== confirmPassword) {
        return res.render('signup', {
            errorMessages: ['A password e a confirmação não coincidem!']
        });
    }
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.render('signup', {
            errorMessages: errorsArray
        });
    } else {
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    console.log('Utilizador já existe!');
                    return res
                        .status(400)
                        .json({ errorMessage: 'Utilizador já existe!' });
                } else {
                    return bcrypt
                        .hash(password, 12)
                        .then((hashedPassword) => {
                            const newUser = new User({
                                primeiroNome: primeiroNome,
                                apelido: apelido,
                                email: email,
                                password: hashedPassword
                            });
                            return newUser.save();
                        })
                        .then((result) => {
                            console.log('Utilizador criado com sucesso!');
                            res.status(200).json(result);
                        });
                }
            })
            .catch((err) => console.log(err));
    }
};

exports.postLogin = (req, res, next) => {
    const { errors } = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.render('login', {
            errorMessages: errorsArray
        });
    } else {
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    console.log('Invalid email or password!');
                    return res.redirect('/login');
                }
                bcrypt
                    .compare(password, user.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            return req.session.save((err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('User logged in!');
                                res.redirect('/');
                            });
                        }
                        console.log('Invalid email or password!');
                        return res.redirect('/login');
                    })
                    .catch((err) => {
                        console.log(err);
                        res.redirect('/login');
                    });
            })
            .catch((err) => console.log(err));
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};

exports.getFatores = (req, res, next) => {
    res.send(fatores);
};
