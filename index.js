const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))//static file is available in public directory
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://Optimistic31:Optimistic31@cluster0.5rz1n.mongodb.net/login',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;
db.on('error',()=>console.log("error in connecting to database"));
db.on('open',()=>console.log("connected to database"));
app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phno=req.body.phno;
    var password=req.body.password

    var data={
        "name":name,
        "email":email,
        "phno":phno,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted succesfully");
    });
    return res.redirect('signup_success.html')
})
    app.get("/",(req,res)=>{
   // res.send("Hello From Server")
   res.set({
    "Allow-access-allow-origin":'*'
   })
   return res.redirect('index.html');
}).listen(3000);
console.log("listening on port 3000");