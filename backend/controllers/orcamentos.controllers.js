const { validationResult } = require('express-validator');

const OrcamentoModel = require('../models/orcamento');
const { Orcamento } = require('../utils/manipulado');
const calcularTotaisOjecto = require('../utils/calcs');

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

exports.postOrcamento = async (req, res, next) => {
    const { errors } = validationResult(req);
    console.log(req.body);
    let orcamento = new Orcamento(
        req.body.nomeManipulado,
        req.body.fatorF,
        req.body.fFarmNome,
        req.body.fFarmQtd,
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
