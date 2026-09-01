if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override")
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js")
const reviews=require("./routes/review.js")
const user=require("./routes/user.js")



const session=require("express-session");
const MongoStore=require("connect-mongo").default
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const User=require("./Model/user.js")



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL=process.env.MONGODB_URL;

const store=MongoStore.create({
  mongoUrl:MONGO_URL,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAftre:24*3600,
})

store.on("error",()=>{
  console.log("Mongo Session error occured")
})

const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,

  },
}


main().then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
});

async function main(){
    mongoose.connect(MONGO_URL);
}

app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user;
  next();
})

app.use("/listing/:id/reviews",reviews)
app.use("/listing",listings)
app.use("/",user)
  // Home routes
  app.get("/",(req,res)=>{
    res.send("this is the main site");
  })

  app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
  })

  app.use((err,req,res,next)=>{
    let{status=500,message="Something is wrong"}=err;
    res.status(status).render("error.ejs",{message})
    //  res.status(status).send(message);
  })
app.listen(3000,()=>{
    console.log("listening to the port is 3000");
  });