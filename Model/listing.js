const mongoose=require("mongoose");

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
        
        default:"https://www.ubuy.co.in/product/FOLCFPLC-beautiful-beach-sunrise-over-the-sea-landscape-photo-laminated-dry-erase-sign-poster-18x12?srsltid=AfmBOoqoo29ZhrweN53dCkURdfnhXQkvFjke5zkBCk1i3STZ3fxCvxK0",
        set:(v)=>v===""?"https://www.ubuy.co.in/product/FOLCFPLC-beautiful-beach-sunrise-over-the-sea-landscape-photo-laminated-dry-erase-sign-poster-18x12?srsltid=AfmBOoqoo29ZhrweN53dCkURdfnhXQkvFjke5zkBCk1i3STZ3fxCvxK0":v,
        
    }
},
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }

});

const listing= mongoose.model("listing",userSchema)
module.exports=listing;