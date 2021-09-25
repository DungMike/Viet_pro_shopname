const nodemailer = require("nodemailer");
const config = require("config");
const mail = config.get("mai");
console.log(mail);


const transporter = nodemailer.createTransport(mail);

module.exports = transporter;