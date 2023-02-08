var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  }
});

const getMailOptions = (toEmail = [], subject = '', html = '') => {
  
  return {
    from: process.env.MAIL_EMAIL,
    to: toEmail,
    subject: subject,
    html: html

  };
  
}

module.exports =  {transporter, getMailOptions}
