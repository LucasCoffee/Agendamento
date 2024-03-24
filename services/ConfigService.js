var config = require("../model/Config");
const mongoose = require("mongoose");

const Msg = mongoose.model("Msg", config, "config")

class ConfigService{

    async getMsg(){

        try {
            var msg = await Msg.findById("63cf41eae9c5919bbaf32edc")
            return msg
        } catch (error) {
            console.log(error)
        }

    }

    async UpdateMsg(id, msg){
        try {
            var res = await Msg.findByIdAndUpdate(id, {msg: msg});
            return res.msg
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = new ConfigService()
