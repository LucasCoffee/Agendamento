
const AppointmentFactory = require("../facturies/AppointmentFatury");
const ConfigService = require("../services/ConfigService");
const transport = require("../public/javascript/nodemailer")

const mongoose = require("mongoose");


const appointment = require("../model/Appointment");
const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {
    constructor(name, email, description, cpf, date, time){
        this.name = name;
        this.email = email;
        this.description = description;
        this.cpf = cpf;
        this.date = date;
        this.time = time;
    }

    async Create(name, email, description, cpf, date, time){

        var newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        });

        try {
            await newAppo.save();
            return true
        } catch (error) {
            console.log(error);
            return false
        }

    };

    async GetAll(showFinished){

        if(showFinished){
            return await Appo.find()
        }else{
            var appos = await Appo.find({finished: false})
        
            var appointments = [];

                appos.forEach(appointment => {
                    appointments.push(AppointmentFactory.Build(appointment))
                });

            return appointments
        }
    }

    async GetById(id){

      try {
        
        var event = await Appo.findById(id)

        return event

      } catch (error) {
        
        console.log(error);
        return("Erro de servidor")

      }
    }

    async Finish(id){

        try {
          await  Appo.findByIdAndUpdate(id, { finished: true});
          return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async Search(query){
        try {
            var response = await Appo.find().or([{email: query}, {cpf: query}]);

            return response
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async SendNotification(){
      var appos = await this.GetAll(false);
      var mensagem = await ConfigService.getMsg()

    console.log(mensagem.msg)

      appos.forEach(app => {
        var date = app.start.getTime();
        var hour = 1000 * 60 * 60;
        var gap = date-Date.now();

        console.log(app)

        if (gap <= hour){

            if(!app.notified){

                transport.sendMail({
                    from: "Lucas <0796c183738ead> ",
                    to: app.email,
                    subject: "Aviso sobre a sua consulta",
                    text: mensagem
                }).then(async (responde) => {
                    console.log(responde)
                    await Appo.findByIdAndUpdate( app.id, {finished: true})
                }).catch(erro => {
                    console.log({"Erro de mensagem do aviso: ": erro})
                })
            }
        }
      })
    }

    async Update(id, {name ,description, cpf, email, date, time}){

        try {
            const userUpdate =  await Appo.findByIdAndUpdate(id, {name ,description, cpf, email, date, time})
            return userUpdate
        } catch (error) {
            console.log(error)
            return false
        }

    }

};



module.exports = new AppointmentService();