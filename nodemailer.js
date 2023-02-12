var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  }
});

// Mail Options for Sending Email (Admin)
const getMailOptionsSend = (toEmail = [], subject = '', html = '') => {
  
  return {
    from: process.env.MAIL_EMAIL,
    to: toEmail,
    subject: subject,
    html: html

  };
  
}

// Mail Options for Receiving Email (Admin)
const getMailOptionsReceive = (receipientName = '', fromEmail = '', subject = '', html = '') => {
  
  return {
    from: `${receipientName} <${fromEmail}>`,
    to: process.env.MAIL_EMAIL,
    subject: subject,
    html: html

  };
  
}

module.exports =  {transporter, getMailOptionsSend, getMailOptionsReceive}
