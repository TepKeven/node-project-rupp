const Customer = require("../../models/admin/Customer");
const { transporter, getMailOptionsReceive } = require("../../nodemailer");

const sendMailAdmin  = async (req,res,next) => {
    
   const request = req.body

   const mailOptions = getMailOptionsReceive(request.contact_receipient_name, request.contact_receipient_email, `${request.contact_receipient_subject} - From ${request.contact_receipient_name}` , `${request.contact_receipient_message} <br/> Email: ${request.contact_receipient_email} <br/> Tel: ${request.contact_receipient_phone}`)

   transporter.sendMail(mailOptions).then(response => {
        res.status(200).json({
            success: response
        })
    })
}

module.exports = {sendMailAdmin}