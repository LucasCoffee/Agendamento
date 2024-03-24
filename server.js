
const express = require("express");
const app = express()
const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/agendamento", {useNewUrlParser: true, useUnifiedTopology: false})

app.listen(8080, (error) => {
    if (error) {
        console.log("Erro na inicializacao")
    } else {
        console.log("SERVER ON")
    }
});

module.exports = app