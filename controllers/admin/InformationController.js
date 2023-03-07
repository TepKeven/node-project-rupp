const Information = require("../../models/admin/Information");
const InformationDescription = require("../../models/admin/InformationDescription");
const {informationDescriptionAssoc} = require("../mainController")
const path = require("path")
const fs = require("fs")

// get
const getInformationPages = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const informationPages = await Information.findAll({
      include: [informationDescriptionAssoc],
   })

   res.status(200).json({
      pages: informationPages.filter((page,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: informationPages.length
   })
   
}

// get by id
const getInformationPageByID = async  (req,res,next) => {
    
   var page_id = req.params.page_id
   const information_page = await Information.findByPk(
      page_id,
      {include: [informationDescriptionAssoc]},
   )

   res.status(200).json({
      page: information_page
   })
}

// add
const addInformationPagePOST = async (req,res,next) => {

   var request = req.body
   var file = req.file

   request.information_description.forEach(page_description => {
        page_description.description = page_description.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")
   })

   const information_page = await Information.create({
      bottom: request.information_bottom,
      sort_order: request.information_sort_order,
      status: request.information_status,
      information_description_assoc: request.information_description
   }, {
      include: [{
        association: informationDescriptionAssoc,
        as: 'information_description_assoc'
      }]
   })

   res.status(200).json(information_page)

}

// edit
const editInformationPage = async (req,res,next) => {

   // update Information Page
   var page_id = req.params.page_id;
   var information_page = await Information.findByPk(page_id)
   var request = req.body

   var updated_information_page = {
        bottom: request.information_bottom,
        sort_order: request.information_sort_order,
        status: request.information_status,
   }

   information_page = Object.assign(information_page,updated_information_page);
   await information_page.save();

   // update category description 

   var informationDescription = await information_page.getInformation_description_assoc()
   var description_id;
   var information_description
   var updated_description;

   informationDescription.map(async (informationDescription,index) => {

      description_id = informationDescription.information_description_id;
      information_description = await InformationDescription.findByPk(description_id);
      updated_description = {
         name: request.information_description[index].name,
         description: request.information_description[index].description.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
         meta_title: request.information_description[index].meta_title,
         meta_description: request.information_description[index].meta_description,
         meta_keyword: request.information_description[index].meta_keyword
      }
      information_description = Object.assign(information_description,updated_description);
      await information_description.save()
   })

   res.status(200).json({"status": "success", "message": `${request.information_description[0].name} Updated Succesfully.`})   
   
}

// delete
const deleteInformationPages = async (req,res,next) => {

   var request = req.body;

   const affected_rows = await InformationDescription.destroy({
      where: {
         information_id: request.information_ids
      }
   }).then(async (rows) => {

      return await Information.destroy({
         where: {
            information_id: request.information_ids
         },
      })
   })

   res.status(200).json({
      "status": "success", "message": `Information Pages Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getInformationPages, getInformationPageByID, addInformationPagePOST, editInformationPage, deleteInformationPages};