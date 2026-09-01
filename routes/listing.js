const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js")
const listing=require("../Model/listing.js")
const {isLogged,isOwner,validateListing} = require("../Middleware.js")
const controller=require("../controllers/listing.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})


 router.get("/new",isLogged,controller.newRenderForm)

 router.route("/")
 .get(wrapAsync(controller.index))
 .post(isLogged,upload.single('list[image][url]'),validateListing,wrapAsync(controller.createListing))

router.route("/:id")
.get(wrapAsync(controller.showlisting))
.put(isLogged,isOwner,upload.single('list[image][url]'),validateListing,wrapAsync(controller.updateListing))
.delete(isLogged,isOwner,wrapAsync(controller.deletListing))
 

//edit route
router.get("/:id/edit",isLogged,isOwner,wrapAsync(controller.editListing))

 
  module.exports=router;