
const mongoose = require("mongoose");
const userModel = require("../model/Usuario");
const newUser = mongoose.model("newUser", userModel)

class Usuario{
    constructor(nome, email, telefone, senha, cidade){
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.cidade = cidade
    }

    async CriarUsuario(){
        try {
            const novoUsuario = new newUser({nome: this.nome, email: this.email, telefone: this.telefone,senha: this.senha, cidade: this.cidade})
            novoUsuario.save()
        } catch (error) {
            console.log(error)
            console.log("Erro no cadastro")
        }
    }

    async GetUserEmail(){

        try {
            const usuario = await newUser.find({email: this.email})
            const teste = await newUser.find()
            console.log(teste)

            if (usuario != []) {
                if(usuario[0].senha == this.senha){
                    return true
                }
            } 
        } catch (error) {
            console.log(error)
        }
            
        return false
    }
}

module.exports = Usuario