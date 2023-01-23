const getProducts = (req,res,next) => {
    res.send("All Products")
}

const getProductById = (req,res,next) => {
    res.send(req.params.id)
}

module.exports= {getProducts, getProductById};