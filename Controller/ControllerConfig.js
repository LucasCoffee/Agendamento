const express = require("express");
const app = express.Router()
const ConfigService = require("../services/ConfigService");

app.get("/viewConfig", async (req, res) => {

    var msg = await ConfigService.getMsg()

    res.render("viewConfi", msg)

})

app.post("/upDateConfig", async(req, res) => {

    var msg = req.body.msg

    await ConfigService.UpdateMsg("63cf41eae9c5919bbaf32edc", msg)

    res.redirect("/viewConfig")

})

module.exports = app