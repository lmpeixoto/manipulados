const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    primeiroNome: { type: String, required: true },
    apelido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
