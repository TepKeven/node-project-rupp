class Product{

    static getAll(req,res,next){
        res.send("All Products")
    }

    static getById(req,res,next){
        res.send(req.params.id)
    }
}
module.exports= Product;