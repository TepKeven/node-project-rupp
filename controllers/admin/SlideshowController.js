const path = require("path")
const fs = require("fs");
const bcrypt = require("bcrypt");
const Slideshow = require("../../models/admin/Slideshow");

// get
const getSlideshows = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const slideshows = await Slideshow.findAll()

   res.status(200).json({
      slideshows: slideshows.filter((slideshow,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: slideshows.length
   })
   
}

// get by id
const getSlideshowById = async  (req,res,next) => {

   var slideshow_id = req.params.slideshow_id
   const slideshow = await Slideshow.findByPk(slideshow_id)

   res.status(200).json({
      slideshow: slideshow
   })
}


// Add GET Request 
const addSlideshowGET = async (req,res,next) => {

   res.status(200).json({
        success: true
   })
}



// Add POST Request
const addSlideshowPOST = async (req,res,next) => {

   var request = req.body
   var file = req.file

   const slideshow = await Slideshow.create({
      title: request.slideshow_title,
      description: request.slideshow_description,
      link: request.slideshow_link,
      image: file == undefined ? "" : file.filename, 
      sort_order: request.slideshow_sort_order,
      status: request.slideshow_status
   })

   res.status(200).json({
      message: "success",
      slideshow: slideshow,
   })
}

// Edit User
const editSlideshowPOST = async (req,res,next) => {
 
   var slideshow_id = req.params.slideshow_id
   var slideshow = await Slideshow.findByPk(slideshow_id)
   var request = req.body
   var file = req.file
   var prevImage = path.join(__dirname, "../../", "assets/images/slideshow/", slideshow.image);

   const updated_slideshow = {
      title: request.slideshow_title,
      description: request.slideshow_description,
      link: request.slideshow_link,
      image: file == undefined ? "" : file.filename, 
      sort_order: request.slideshow_sort_order,
      status: request.slideshow_status
   }

   if(fs.existsSync(prevImage) && file != undefined){
      fs.unlink(prevImage,(err) => {
            
      })
   }

   slideshow = Object.assign(slideshow, updated_slideshow);

   await slideshow.save();

   res.status(200).json({"status": "success", "message": `${slideshow.title} User Role Updated Succesfully.`})   
   
}

// Delete User
const deleteSlideshows = async (req,res,next) => {

   var request = req.body;

   const deletedItems = await Slideshow.findAll({
      attributes: ["image"],
      where: {
         slideshow_id: request.slideshow_ids
      }
   })


   deletedItems.map((item) => {

      var imagePath = path.join(__dirname, "../../", "assets/images/slideshow/", item.image);

      if(fs.existsSync(imagePath)){
         fs.unlink(imagePath,(err) => {
            
         })
      }
   })

   const affected_rows = await Slideshow.destroy({
      where: {
         slideshow_id: request.slideshow_ids
      }
   })

   res.status(200).json({
      "status": "success", "message": `${affected_rows} User Roles Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getSlideshows,addSlideshowGET, addSlideshowPOST,editSlideshowPOST, getSlideshowById, deleteSlideshows};