const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt")
const UserService = require("../services/UserService")
const AppointmentService = require("../services/AppointmentService");


app.get("/home", (req, res) =>{
    res.render("iniciar.ejs");
})

app.get("/cadastrar", (req, res) =>{
    res.render("cadastroUser.ejs");
})

app.post("/cadastro", async(req, res)=>{

    const {nome, email, telefone, senha, cidade} = req.body

    try {
        const novoUsuario = new UserService(nome, email, telefone, senha, cidade)
        await novoUsuario.CriarUsuario();
        res.redirect("/usuario/login")
    } catch (error) {
        res.send("Erro ao criar usuario")
    }
})

app.get("/login", async (req, res) => {
    res.render("login.ejs")
});

app.post("/login", async(req, res) =>{
    const {email, senha} = req.body;
    const usuario = new UserService("", email, "", senha);
    try {
       if (await usuario.GetUserEmail()) {
            res.redirect("/usuario/home")
       } else {
            res.send("Login errado")
       }
    } catch (error) {
        req.send("Erro de login")
    }
});

app.get("/cadastrar/consulta", (req, res)=>{
    res.render("cadastrarConsulta.ejs", {medicos: []})
})


app.post("/categoria-medicos", async(req, res) =>{
   // Array de médicos com nome e categoria
var medicosCategoriaNome = [
    { nome: 'Dr. João', categoria: 'clinico geral' },
    { nome: 'Dra. Maria', categoria: 'clinico geral' },
    { nome: 'Dr. Carlos', categoria: 'clinico geral' },
    { nome: 'Dr. Pedro', categoria: 'pediatra' },
    { nome: 'Dra. Ana', categoria: 'pediatra' },
    { nome: 'Dr. Rafael', categoria: 'pediatra' },
    { nome: 'Dr. Roberto', categoria: 'cardiologista' },
    { nome: 'Dra. Laura', categoria: 'cardiologista' },
    { nome: 'Dr. Miguel', categoria: 'cardiologista' }
  ];
  
    const categoria = req.body.categoria
    var medicos = medicosCategoriaNome.filter(medico => medico.categoria == categoria);
    res.render("cadastrarConsulta.ejs", {medicos})

});

app.post("/cadastrar/consulta", (req, res)=>{
    const {medico, cpf, data, horario, } = req.body
    console.log(req.body)

    try {
        var description = "consulta Lucas, email: lucasfcaje13@gmail.com " + medico
        AppointmentService.Create("lucas", "lucasfcaje13@gmail.com", description, cpf, data, horario);
        res.render("cadastrarConsulta.ejs", {medicos: []})
    } catch (error) {
        res.send("Erro no cadastro de sua consulta")
    }

})



module.exports = app