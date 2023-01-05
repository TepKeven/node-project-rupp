class Slideshow{

    static getAll(req,res,next){
        res.send(req.params.id)
    }
}
module.exports= Slideshow;