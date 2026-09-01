const listing=require("../Model/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index=async(req,res)=>{
    const allListings= await listing.find({});
    res.render("listings/index.ejs",{allListings});
    }

module.exports.newRenderForm=(req,res)=>{
    res.render("listings/new")
  };

module.exports.showlisting=async(req,res)=>{
    let {id}=req.params;
    const list= await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!list){
      req.flash("error","your listing does not exist")
     return res.redirect("/listing")
    }
    res.render("listings/show.ejs",{list})
 }

 module.exports.createListing=async(req,res,next)=>{
    let coordinates=await geocodingClient.forwardGeocode({
    query:req.body.list.location,
    limit:1
   })
   .send()
   
   let url=req.file.path
   let filename=req.file.filename
   console.log(url,filename)

    let list=new listing(req.body.list);
      list.owner=req.user._id;
      list.image={url,filename}

      list.geometry=coordinates.body.features[0].geometry;
      await list.save()
     
     req.flash("success","New listing is created");
     res.redirect("/listing");
    }

    module.exports.editListing=async(req,res)=>{
        let {id}=req.params;
        let list= await listing.findById(id);
            if(!list){
            req.flash("error","your listing does not exist")
            return res.redirect("/listing")
         }
         let originalImageUrl=list.image.url;
          originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
          res.render('listings/edit.ejs',{list,originalImageUrl});
      }
    
      module.exports.updateListing=async(req,res)=>{
          let {id}=req.params;
           let list= await listing.findByIdAndUpdate(id,{...req.body.list});
           if(typeof req.file !== "undefined"){
            
           let url=req.file.path;
           let filename=req.file.filename;
           list.image={url,filename};
           await list.save()

           }
             req.flash("success","Update the listings");
             return res.redirect(`/listing/${id}`);
        }


    module.exports.deletListing=async(req,res)=>{
        let {id}=req.params;
       await listing.findByIdAndDelete(id);
         req.flash("success","Delete listing");
        res.redirect("/listing");
      }