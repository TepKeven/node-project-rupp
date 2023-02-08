const Slideshow = require("../../models/admin/Slideshow")

const getSlideshows = async (req, res, next) => {
  
  const slideshows = await Slideshow.findAll();
  
  res.status(200).json({
    slideshows: slideshows
  })

};

module.exports = { getSlideshows };
