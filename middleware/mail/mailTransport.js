const nodemailer = require('nodemailer');
const sendTransport = require('nodemailer-sendgrid-transport');



const transporter = nodemailer.createTransport(sendTransport({
    auth: {
        api_key: process.env.SENDGRID_MESSAGE
    }
}));


module.exports = transporter;
