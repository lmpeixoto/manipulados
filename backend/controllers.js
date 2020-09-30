const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const OrcamentoModel = require('./model/orcamento');
const { Manipulado, Orcamento } = require('./utils/manipulado');
const ManipuladoModel = require('./model/manipulado');
const User = require('./model/user');

const calcularTotaisOjecto = (objecto) => {
    objecto.calculateIVA();
    objecto.calculateTotalPrice();
    return objecto;
};

exports.postOrcamento = async (req, res, next) => {
    const { errors } = validationResult(req);
    let orcamento = new Orcamento(
        req.body.nomeManipulado,
        req.body.fFarmNome,
        req.body.fFarmQtd,
        req.body.materiasPrimas,
        req.body.materiaisEmbalagem
    );
    orcamento = calcularTotaisOjecto(orcamento);
    const orcamentoToSave = new OrcamentoModel({
        nomeManipulado: orcamento.nomeManipulado,
        fatorF: orcamento.fatorF,
        fFarmNome: orcamento.fFarmNome,
        fFarmPrice: orcamento.fFarmPrice,
        fFarmQtd: orcamento.fFarmQtd,
        materiasPrimas: orcamento.materiasPrimas,
        materiasPrimasPrice: orcamento.matPrimTotalPrice,
        materiaisEmbalagem: orcamento.materiaisEmbalagem,
        materiaisEmbalagemPrice: orcamento.matEmbTotalPrice,
        IVA: orcamento.IVA,
        totalPrice: orcamento.totalPrice
    });

    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.json({
            manipulado: orcamentoToSave,
            errorMessages: errorsArray
        });
    } else {
        try {
            const newOrcamento = await orcamentoToSave.save();
            res.json({
                manipulado: newOrcamento,
                errorMessages: ''
            });
        } catch (err) {
            res.json({
                manipulado: orcamentoToSave,
                errorMessages: [
                    'Ocorreu um erro a gravar para a base de dados!'
                ]
            });
        }
    }
};

exports.postManipulado = async (req, res, next) => {
    const { errors } = validationResult(req);

    let manipulado = new Manipulado(
        req.body.lote,
        req.body.nomeManipulado,
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
    manipulado = calcularTotaisOjecto(manipulado);

    const manipuladoToSave = new ManipuladoModel({
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
        res.json({
            manipulado: manipuladoToSave,
            errorMessages: errorsArray
        });
    } else {
        try {
            const newManipulado = await manipuladoToSave.save();
            res.json({
                manipulado: manipuladoToSave,
                errorMessages: ''
            });
        } catch (err) {
            res.json({
                manipulado: manipuladoToSave,
                errorMessages: [
                    'Ocorreu um erro a gravar para a base de dados!'
                ]
            });
        }
    }
};

exports.editManipulado = async (req, res, next) => {
    const manipuladoID = req.query.manipuladoID;
    const newManipulado = new ManipuladoModel({
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
    try {
        const oldManipulado = await ManipuladoModel.findById(manipuladoID);
        if (!oldManipulado) {
            res.status(400).json({
                errorMessage: 'Manipulado ID não encontrado! Interrompido!'
            });
        } else {
            await newManipulado.save();
            res.status(200).json(newManipulado);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.editOrcamento = async (req, res, next) => {
    const orcamentoID = req.query.orcamentoID;
    const newOrcamento = new OrcamentoModel({
        nomeManipulado: req.body.nomeManipulado,
        fatorF: req.body.fatorF,
        fFarmNome: req.body.fFarmNome,
        fFarmPrice: req.body.fFarmPrice,
        fFarmQtd: req.body.fFarmQtd,
        materiasPrimas: req.body.materiasPrimas,
        materiasPrimasPrice: req.body.materiasPrimasPrice,
        materiaisEmbalagem: req.body.materiaisEmbalagem,
        materiaisEmbalagemPrice: req.body.materiaisEmbalagemPrice,
        IVA: req.body.IVA,
        totalPrice: req.body.totalPrice
    });
    try {
        const oldOrcamento = await OrcamentoModel.findById(orcamentoID);
        if (!oldOrcamento) {
            res.status(400).json({
                errorMessage: 'Orcamento ID não encontrado! Interrompido!'
            });
        } else {
            await newOrcamento.save();
            res.status(200).json(newOrcamento);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.postDeleteManipulado = (req, res, next) => {
    let manipuladoId = req.params.manipuladoId;
    ManipuladoModel.findByIdAndDelete(manipuladoId, (err, doc) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
};

exports.postDeleteOrcamento = (req, res, next) => {
    let orcamentoId = req.params.orcamentoId;
    ManipuladoModel.findByIdAndDelete(orcamentoId, (err, doc) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
};

exports.getOrcamento = async (req, res, next) => {
    const orcamentoId = req.params.orcamentoId;
    try {
        const orcamento = await OrcamentoModel.findById(orcamentoId);
        if (orcamento) {
            res.status(200).json(orcamento);
        } else {
            res.status(400).json({
                errorMessages: 'Orçamento não encontrado!'
            });
        }
    } catch (err) {
        res.status(400).json({
            errorMessages: 'Orçamento não encontrado!'
        });
    }
};

exports.orcamentoGetAll = async (req, res, next) => {
    try {
        const results = await OrcamentoModel.find();
        if (results.length === 0) {
            res.json({
                errorMessages:
                    'Não foram encontrados orçamentos na base de dados!'
            });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getManipulado = async (req, res, next) => {
    const manipuladoId = req.params.manipuladoId;
    try {
        const manipulado = await ManipuladoModel.findById(manipuladoId);
        if (manipulado) {
            res.status(200).json(manipulado);
        } else {
            res.status(400).json({
                errorMessages: 'Manipulado não encontrado!'
            });
        }
    } catch (err) {
        res.status(400).json({
            errorMessages: 'Manipulado não encontrado!'
        });
    }
};

exports.manipuladoGetAll = async (req, res, next) => {
    console.log('here');
    try {
        const results = await ManipuladoModel.find({});
        console.log(results);
        if (results.length === 0) {
            res.json({
                errorMessages:
                    'Não foram encontrados manipulados na base de dados!'
            });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// }

// exports.postPesquisa = (req, res, next) => {
//     let searchQuery = req.body['search-query'];
//     const regex = new RegExp(escapeRegex(searchQuery), 'gi');
//     let searchChoice = req.body['search-choices'];
//     let radioManipulado = req.body.manipulado;
//     let queryChoice;
//     let find = {};
//     switch (searchChoice) {
//         case 'Nome':
//             queryChoice = 'nomeManipulado';
//             break;
//         case 'Substância Ativa':
//             queryChoice = 'Substância Ativa';
//             break;
//         case 'Forma Farmacêutica':
//             queryChoice = 'fFarmNome';
//             break;
//     }
//     find[queryChoice] = regex;
//     if (radioManipulado === 'orçamento') {
//         OrcamentoManipulado.find(find)
//             .then((manip) => {
//                 if (manip.length > 0) {
//                     return res.render('pesquisa', { manipulados: manip });
//                 } else {
//                     return res.render('pesquisa', {
//                         manipulados: '',
//                         errorMessage: 'Resultado de pesquisa não encontrado!'
//                     });
//                 }
//             })
//             .catch((err) => console.log(err));
//     }
//     ManipuladoModel.find(find)
//         .then((manip) => {
//             if (manip.length > 0) {
//                 return res.render('pesquisa', { manipulados: manip });
//             } else {
//                 return res.render('pesquisa', {
//                     manipulados: '',
//                     errorMessage: 'Resultado de pesquisa não encontrado!'
//                 });
//             }
//         })
//         .catch((err) => console.log(err));
// };

// exports.getArquivo = (req, res, next) => {
//     ManipuladoModel.find()
//         .then((resultado) => {
//             res.render('arquivo', {
//                 resultado: resultado
//             });
//         })
//         .catch((err) => console.log(err));
// };

exports.postSignup = (req, res, next) => {
    const { errors } = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const primeiroNome = req.body.primeiroNome;
    const apelido = req.body.apelido;
    if (password !== confirmPassword) {
        return res.status(403).json({
            errorMessages:
                'Não autorizado! A password e a confirmação não coincidem!'
        });
    }
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.status(400).json({
            errorMessages: errorsArray
        });
    } else {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    console.log('user already exists!');
                    return res
                        .status(403)
                        .json({ errorMessages: 'User already exists!' });
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
                            console.log('User successfully created!');
                            res.json({
                                result,
                                msg: 'User successfully created!'
                            });
                        });
                }
            })
            .catch((err) => res.status(400).json(err));
    }
};

exports.postLogin = (req, res, next) => {
    const { errors } = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.status(403).json({
            errorMessages: errorsArray
        });
    } else {
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    console.log('Invalid email or password!');
                    return res
                        .status(403)
                        .json({ errorMessages: 'Invalid email or password!' });
                }
                bcrypt
                    .compare(password, user.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            return req.session.save((err) => {
                                if (err) {
                                    res.json(err);
                                }
                                res.status(200).json(user);
                            });
                        }
                        res.status(403).json({
                            errorMessages: 'Invalid email or password!'
                        });
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
            })
            .catch((err) => res.status(400).json(err));
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json({ msg: 'Logout successfully!' });
        }
    });
};

exports.getFormasFarmaceuticas = (req, res, next) => {
    res.send(formasFarmaceuticas);
};

exports.getFatores = (req, res, next) => {
    res.send(fatores);
};