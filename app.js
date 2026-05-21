const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./Model/listing.js")
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
main().then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
});

async function main(){
    mongoose.connect(MONGO_URL);
}

  app.listen(3000,()=>{
    console.log("listening to the port is 3000");
  });
  app.get("/",(req,res)=>{
    res.send("this is the main site");
  })

  app.get("/listing", async(req,res)=>{
    const allListings= await listing.find({});
    res.render("listings/index.ejs",{allListings});
    })
  

  app.get("/listing/new",(req,res)=>{
    res.render("listings/new")
  });
  app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const list= await listing.findById(id);
    res.render("listings/show.ejs",{list})
    
  });
  app.post("/listing",async(req,res)=>{
    let list=new listing(req.body.list);
    await list.save()
  res.redirect("/listing");
  });
  app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let list= await listing.findById(id);
   res.render('listings/edit.ejs',{list});
  });
  app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
      await listing.findByIdAndUpdate(id,{...req.body.list});
      res.redirect("/listing");
  });
  app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
   await listing.findByIdAndDelete(id);
    res.redirect("/listing");
  })