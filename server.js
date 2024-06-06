
const express = require("express");
const app = express()
const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

try {
    mongoose.connect("mongodb://localhost:27017/agendamento", {useNewUrlParser: true, useUnifiedTopology: false})
} catch (error) {
    console.log(error)
}
app.listen(8080, (error) => {
    if (error) {
        console.log("Erro na inicializacao")
    } else {
        console.log("SERVER ON: http://localhost:8080/index")
    }
});

module.exports = app