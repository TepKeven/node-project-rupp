const Session = require("../../models/admin/Session")
const { Sequelize, Op } = require("sequelize");
const Order = require("../../models/admin/Order");
const Customer = require("../../models/admin/Customer");
const User = require("../../models/admin/User");

const getDashboardData = async (req,res,next) => {
     
    const orders = await Order.findAll();
    const customers = await Customer.findAll();
    const total_revenue = await Order.findOne({
        attributes: [
            [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("total"), 'decimal')), "total"], 
        ],
    })
    const customer_online = await Session.findOne({
        attributes: [
            [Sequelize.fn("COUNT", Sequelize.cast(Sequelize.col("session_id"), 'integer')), "customer_online"], 
        ],
        where: {
            is_customer: 1,
            expire: {
                [Op.gt]: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        }
    })

    // Order By Month of Overall Countries
    const order_by_months = await Order.findAll({
        attributes: [
            [Sequelize.fn("MONTH",Sequelize.col("createdAt")), 'month'], 
            [Sequelize.fn("COUNT", Sequelize.cast(Sequelize.col("order_id"), 'integer')), 'order_count'], 
        ],
        group: [Sequelize.fn("MONTH",Sequelize.col("createdAt"))],
        raw: true
    })

    var overall_order_by_month = []

    for(let i = 1; i <= 12; i++){

        let order_per_month = order_by_months.find(order => order.month == i)
        if(order_per_month != null){
            overall_order_by_month.push(order_per_month.order_count)
        }
        else{
            overall_order_by_month.push(0)
        }
   }

    const user_in_session = await Session.findOne({
        
        attributes: ["email"],
        where: {
            token: req.cookies.login_token,
            is_customer: 0,
        }
    }).then(async (session) => {

        return await User.findOne({
            attributes: ["username", "email", "image"],
            where: {
                email: session.email
            }
        })
    })

    const recent_customers = await Customer.findAll({
        attributes: ["first_name", "email", "image"],
        order: [
            ["createdAt", "desc"]
        ],
        limit: 3
    })

    const newsletter_count = await Customer.findAll({
        attributes: [
            "newsletter",
            [Sequelize.fn("COUNT", Sequelize.cast(Sequelize.col("newsletter"), 'integer')), 'count'], 
        ],
        group: ["newsletter"]
    })

    // Order By Countries and By Month
    const order_by_countries = await Order.findAll({
        attributes: [
            "country_id",
            "country",
            [Sequelize.fn("MONTH",Sequelize.col("createdAt")), 'month'], 
            [Sequelize.fn("COUNT", Sequelize.cast(Sequelize.col("order_id"), 'integer')), 'order_count'], 
        ],
        group: ["country_id", Sequelize.fn("MONTH",Sequelize.col("createdAt"))],
        raw: true
    })

    const country_ids = [
        ... new Set(
            order_by_countries.map(order_by_country => {
                return order_by_country.country_id
            })
        )
    ]

    var order_country_by_month = {}

    for(let country_id of country_ids){

        var order_of_country = []
        var order_country = []
        var country_name;
        var order_obj = {};
        
        for(let i = 1; i <= 12; i++){

            var order_per_month = order_by_countries.find(order_by_country => {
               return (order_by_country.month == i && order_by_country.country_id == country_id)
            })
            
            if(order_per_month != null){

               country_name = order_per_month.country
               order_of_country.push(order_per_month.order_count)
            }
            else{
               order_of_country.push(0)
            }
       }

        order_country.push({
            name: country_name,
            data: order_of_country
        })

        order_obj["data_stats"]  = order_country;
        order_obj["order_count"] = order_of_country.reduce((total,order_count) => parseInt(order_count) + total ,0)

        order_country_by_month[country_name] = order_obj

    }


    // {"Cambodia": {data_stats: [{name: data: }], order_count: 3}, ....}

    res.status(200).json({
       orders: orders,
       customers: customers,
       total_revenue: total_revenue,
       customer_online: customer_online,
       overall_order_by_month: overall_order_by_month,
       user_in_session: user_in_session,
       recent_customers: recent_customers,
       newsletter_count: newsletter_count,
       order_country_by_month: order_country_by_month
    })
    
 }

 module.exports = {getDashboardData}