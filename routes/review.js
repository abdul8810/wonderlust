const express=require("express");
const router=express.Router({mergeParams:true});
const listing=require("../Model/listing.js")
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../Model/review.js")
const {validateReview,isLogged,isReviewAuthor}=require("../Middleware.js")
const reviewController=require("../controllers/review.js")

  router.post("/",isLogged,validateReview,wrapAsync(reviewController.createReview))
 
  router.delete("/:reviewId",isLogged,isReviewAuthor,wrapAsync(reviewController.destroyReview))

    module.exports=router;