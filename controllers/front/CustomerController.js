const { Op } = require("sequelize")
const Address = require("../../models/admin/Address")
const Country = require("../../models/admin/Country")
const Customer = require("../../models/admin/Customer")
const CustomerGroup = require("../../models/admin/CustomerGroup")
const Session = require("../../models/admin/Session")

// get by id
const getCustomer = async  (req,res,next) => {

    var customer_login_token = req.cookies.customer_login_token || ""
    const current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const customer_session = await Session.findOne({
        where: {
            token: customer_login_token,
            is_customer: 1,
            expire: {
                [Op.gt]: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        }
    })

    if(customer_session){

        const customer = await Customer.findOne({
            where:{
                email: customer_session.email,
            }
        })
 
        const addresses = await Address.findAll({
           where: {
              customer_id: customer.customer_id
           }
        })

        await Promise.all(addresses.map(async (address) => {

            const country = await Country.findByPk(address.country_id)
            address.setDataValue("country", country.name)
        
        }))

     
        res.status(200).json({
           customer: customer,
           addresses: addresses
        })
    }
    else{
        res.status(404).json({
            status: false,
            message: "Please login again as your session has expired."
         })
    }
 }

 module.exports = {getCustomer}