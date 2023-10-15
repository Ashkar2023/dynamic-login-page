const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const{v4:uuidv4} = require("uuid");
const router = require("./router");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));//can use new inbuilt middlewares in exchange of body-parser
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));


app.set("view engine","ejs");

app.use("/static",express.static(path.join(__dirname,"public")))
app.use("/assets",express.static(path.join(__dirname,"public/assets")))

app.use(session({
    secret:uuidv4(),//this will make the session completely secret and unique
    resave:false,
    saveUninitialized:true
}))

app.use("/",router);//defintion in Daily notes,12-Oct-2023

app.listen(3000,()=>{console.log("server on http://localhost:3000")})