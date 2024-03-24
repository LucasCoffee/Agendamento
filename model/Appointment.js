const mogoose = require("mongoose");

const appointment = new  mogoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean,
    notified: Boolean
});

module.exports = appointment