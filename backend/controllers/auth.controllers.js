const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { validationResult } = require('express-validator');

const User = require('../models/user');

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

exports.postLogin = async (req, res, next) => {
    const { errors } = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    if (errors.length > 0) {
        let errorsArray = [];
        errors.forEach((error) => errorsArray.push(error.msg));
        return res.status(403).json({
            errorMessages: errorsArray
        });
    } else {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log('Invalid email!');
                return res
                    .status(403)
                    .json({ errorMessages: 'Invalid email!' });
            }
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (passwordCheck) {
                const token = jwt.sign(
                    { _id: user.id },
                    process.env.TOKEN_SECRET
                );
                res.header('auth-token', token);
                req.session.isLoggedIn = true;
                req.session.user = user;
                try {
                    const newSession = req.session.save();
                    return res.status(200).json(user);
                } catch (err) {
                    return res.status(400).json(err);
                }
            }
            return res.status(403).json({
                errorMessages: 'Password is wrong!'
            });
        } catch (err) {
            res.status(400).json(err);
        }
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
