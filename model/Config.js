const mogoose = require("mongoose");

const config = new mogoose.Schema({
    msg: String
});

module.exports = config