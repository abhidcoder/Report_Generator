const mongoose = require("mongoose");

const DB = "mongodb+srv://abhishek:abhishek@cluster0.s1hunpf.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB,{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
console.log("connected and ready to go")
}).catch((error)=>console.log(error));




const ItemSchema = new mongoose.Schema(
  {
  Username:{
    type: String,
  },
  Item:{
  type:String,

 },
 Price:{
  type:Number,
 },
  Made_on: { type: Date ,default: Date.now },
  }
);



const Itemss = mongoose.model("ListOfItems",ItemSchema);

module.exports =  Itemss;