const getOrders = (req,res,next) => {
    res.send("Orders of Customer")
}

const getOrderById = (req,res,next) => {
    res.send(req.params.id)
}

module.exports= {getOrders,getOrderById};