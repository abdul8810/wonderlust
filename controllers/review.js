const Review=require("../Model/review")
const listing=require("../Model/listing")

module.exports.createReview=async(req,res)=>{
      let list=await listing.findById(req.params.id)
      let newReview=new Review(req.body.review)
       newReview.author=req.user._id;
       list.reviews.push(newReview)
        await newReview.save()
       await list.save()
        req.flash("success","New post is created");
       res.redirect(`/listing/${list._id}`)
 }

 module.exports.destroyReview=async(req,res)=>{
        let{id,reviewId}=req.params;
         await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
         await Review.findByIdAndDelete(reviewId)
          req.flash("success","Review Deleted");
          res.redirect(`/listing/${id}`)
      }