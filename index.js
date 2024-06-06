const bodyParser = require("body-parser");
const AppointmentService = require("./services/AppointmentService");
const app = require("./server")
const express = require("express")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//controllers
const ControllerEvent = require("./Controller/ControllerEvent");
const ControllerConfig = require("./Controller/ControllerConfig");
const ControllerUsuario = require("./Controller/ControllerUser");
app.use("/usuario", ControllerUsuario)
app.use("/", ControllerEvent)
app.use("/", ControllerConfig)





app.get("/", (req, res) => {
    res.render("index")
});

app.get("/weekly", (req, res) => {
    res.render("weekly")
})

app.get("/getCalendar", async (req, res) => {

    try {
        var appointment = await AppointmentService.GetAll(false);
        res.json(appointment)
    } catch (error) {
        res.send("Error in server")
        console.log(error);
    }
    
});

app.get("/list", async(req, res) => {

    try {
        var events = await AppointmentService.GetAll(true);
        res.render("list", {events})
    } catch (error) {
        res.send("Error in server")
        console.log(error);
    }

});

app.get("/searchResult", async(req, res) => {

    var query = req.query.search

    var appo = await AppointmentService.Search(query)

    res.render("list", {events: appo})

});

const pollTime = 1000 * 60 * 0.2;

// setInterval(async () => {
    
//     await AppointmentService.SendNotification()

// }, pollTime);