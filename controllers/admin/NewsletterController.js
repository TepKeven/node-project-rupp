const Customer = require("../../models/admin/Customer");
const { transporter, getMailOptionsSend } = require("../../nodemailer");

const sendMailType = async (req,res,next) => {

     const request = req.body

     if(request.newsletter_to == 1){
        
          sendMaillEveryone(request).then(response => {
               res.status(200).json({
                    success: response
               })
          })

     }
     else if(request.newsletter_to == 2){
          
        sendMailSubscriber(request).then(response => {
          res.status(200).json({
               success: response
          })
        })
     } 
}


const sendMaillEveryone  = async (request) => {

   const customers = await Customer.findAll({
        attributes: ["email"]
   });

   const customer_emails = customers.map(customer => {
     return customer.email
   })

   const mailOptions = getMailOptionsSend(customer_emails, request.newsletter_subject, request.newsletter_message)

   return await transporter.sendMail(mailOptions);

}

const sendMailSubscriber  = async (request) => {
     
     const customers = await Customer.findAll({
          attributes: ["email"],
          where: {
               newsletter: 1
          }
     });
  
     const customer_emails = customers.map(customer => {
       return customer.email
     })
  
     const mailOptions = getMailOptionsSend(customer_emails, request.newsletter_subject, request.newsletter_message)
  
     return await transporter.sendMail(mailOptions);
}

module.exports= {sendMailType};