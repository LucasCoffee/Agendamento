const express = require("express");
const { model } = require("mongoose");
const app = express.Router();
const AppointmentService = require("../services/AppointmentService");


app.get("/cadastro", (req, res) => {
    res.render("create", {dados: undefined})
});

app.post("/create", async (req, res) => {

    var status = await AppointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    );

    if (status) {
        res.redirect("/cadastro")
    } else {
        res.send("Ocorreu uma falha")
    }
});

app.get("/event/:id", async (req, res) =>{

    var event = await AppointmentService.GetById(req.params.id);

    res.render("event", {event})
    
})

app.post("/finish", async(req, res) => {

    var id = req.body.id

    await AppointmentService.Finish(id)

    res.redirect("/")

});

app.get("/edit/load/:id", async (req, res) => {

    const id = req.params.id
    const dados = await AppointmentService.GetById(id);

    res.render("create", {dados})

});

app.post("/edit/save/:id", async (req, res) => {

    const id = req.params.id
    const {name, description, cpf, email, date, time} = req.body

    try {
        const response = await AppointmentService.Update(id, {name, description, cpf, email, date, time})
        res.redirect("/event/" + response._id)
    } catch (error) {
        res.statusCode(500)
    }

})

module.exports = app