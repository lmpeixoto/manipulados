const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const OrcamentoModel = require('../models/orcamento');
const { Orcamento } = require('../utils/manipulado');
const calcularTotaisOjecto = require('../utils/calcs');

exports.orcamentoGetAll = async (req, res, next) => {
    try {
        const results = await OrcamentoModel.find();
        console.log(results);
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
    let orcamento = new Orcamento(
        req.body.nomeManipulado,
        req.body.fFarmNome,
        req.body.fFarmQtd,
        req.body.fatorF,
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
            console.log(newOrcamento);
            res.json({
                manipulado: newOrcamento
            });
        } catch (err) {
            console.log(err);
            res.json({
                manipulado: orcamentoToSave,
                errorMessages: err
            });
        }
    }
};

exports.editOrcamento = async (req, res, next) => {
    const { orcamentoId } = req.params;
    const { errors } = validationResult(req);
    let orcamento = new Orcamento(
        req.body.nomeManipulado,
        req.body.fFarmNome,
        req.body.fFarmQtd,
        req.body.fatorF,
        req.body.materiasPrimas,
        req.body.materiaisEmbalagem
    );
    orcamento = calcularTotaisOjecto(orcamento);
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        res.json({
            manipulado: orcamentoToSave,
            errorMessages: errorsArray
        });
    } else {
        try {
            const oldOrcamento = await OrcamentoModel.findById(orcamentoId);
            if (!oldOrcamento) {
                res.status(400).json({
                    errorMessage: 'Orcamento ID não encontrado! Interrompido!'
                });
            } else {
                const filter = { _id: orcamentoId };
                console.log(orcamento);
                await OrcamentoModel.findByIdAndUpdate(filter, orcamento, {
                    new: true
                });
                res.status(200).json(orcamento);
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

exports.postDeleteOrcamento = (req, res) => {
    let orcamentoId = req.params.orcamentoId;
    OrcamentoModel.findByIdAndDelete(orcamentoId, (err, doc) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
};
