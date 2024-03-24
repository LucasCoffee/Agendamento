const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587 ,
    auth: {
      user: "9666889bef05a1",
      pass: "ced46ea802fe54"
    }
});

