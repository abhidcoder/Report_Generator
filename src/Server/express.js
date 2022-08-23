const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
const HandleData = require("./database");

const path = require('path')
app.use(express.static(path.join(__dirname + "/public")))


app.all("/store",async(req, res) =>{
    console.log(req.body)
    try {
        const Handles = await new HandleData({
            Username: req.body.name,
            Item: req.body.item,
            Price: req.body.price,
           
        })
       const handled = await Handles.save();
    } catch (error) {
        res.send("error");
    }
  
    })


app.all("/get",async(req, res) => {
    
try{
        const abcd = await HandleData.find({}).lean();
        res.send(abcd);   
  } 
  catch (error) {
    //res.redirect("https://www.google.com"); 
    res.status(400).send(error);
  }
   
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(process.env.PORT || 8005, () => {
    console.log("Runing on port","http://localhost:"+8005);
    });
