const { validationResult } = require('express-validator');

const { Manipulado } = require('../utils/manipulado');
const ManipuladoModel = require('../models/manipulado');
const calcularTotaisOjecto = require('../utils/calcs');

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
