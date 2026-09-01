const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../Model/listing.js");



const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
main().then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
});

async function main(){
    mongoose.connect(MONGO_URL);
}

const initDB=async()=>{ 
     await Listing.deleteMany({});
     initData.data=initData.data.map((obj)=>({...obj,owner:"6a85b5739cf109c149b3107d"}))
     await Listing.insertMany(initData.data);
     console.log("data was initializaed");
}
initDB();