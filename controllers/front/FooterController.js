const Setting = require("../../models/admin/Setting");


// Add GET Request 
const getFooterItems = async (req,res,next) => {
   
    const setting = await Setting.findOne();

    res.status(200).json({
        setting: setting
    })
   
}


module.exports= {getFooterItems};