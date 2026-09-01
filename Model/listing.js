const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")
const userSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        maxLength:200

    },
    price:{
        type:Number,
        required:true

    },
    image:{
        url:{
            type:String,
            filename:String,
        
        default:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        set:(v)=>v===""?"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v,
        
    }
},
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[
        {
           type:Schema.Types.ObjectId,
            ref: "Review"

        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

});
userSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
       await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})
const listing= mongoose.model("listing",userSchema)
module.exports=listing;