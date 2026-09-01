const listing=require('./Model/listing')
const Review=require('./Model/review')
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js")

module.exports.isLogged=(req,res,next)=>{
 if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl
    req.flash("error","please login the wonderlust")
    return res.redirect("/login")
 }
 next();
} 

module.exports.saveredirectUrl=(req,res,next)=>{
   if(req.session.redirectUrl){
       res.locals.redirectUrl=req.session.redirectUrl
   }
   next();
}

module.exports.isOwner=async(req,res,next)=>{
     let {id}=req.params;
     let list=await listing.findById(id)
     if(!list.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","you are not owner to the listing")
      return res.redirect(`/listing/${id}`)
     }
     next();
     

}


module.exports.validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
   
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(404,errMsg)
    }else{
      next()
    }
  }

  
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
     
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg)
      }else{
        next()
      }
    }
    module.exports.isReviewAuthor=async(req,res,next)=>{
      let {id,reviewId}=req.params;
      let review=await Review.findById(reviewId)
      if(!review.author._id.equals(res.locals.currUser._id)){
         req.flash("error","you are not author to this review")
         return res.redirect(`/listing/${id}`)
      }
      next();
    }
  