const {informationDescriptionAssoc} = require("../mainController")
const Information = require("../../models/admin/Information");
const { Op } = require("sequelize");



// get Product by id
const getInformationPageByID = async  (req,res,next) => {

   var page_id_name = req.params.page_id_name

    const information_page = await Information.findByPk(
        page_id_name,
        {include: [informationDescriptionAssoc]},
    )

   res.status(200).json({
      success: true,
      page: information_page
   })
}


module.exports= {getInformationPageByID};