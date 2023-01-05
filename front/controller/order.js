class Order{

    static getAll(req,res,next){
        res.send("Order of Customer")
    }

    static getById(req,res,next){
        res.send(req.params.id)
    }
}
module.exports= Order;