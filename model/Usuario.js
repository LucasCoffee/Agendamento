const mogoose = require("mongoose");

const newUser = new  mogoose.Schema({
    name: String,
    email: String,
    numero: Number,
    senha: String,
    cidade: String,
    CodigoVeri: String

});

module.exports = newUser