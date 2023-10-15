var express = require("express");
var router = express.Router();
const nocache = require("nocache");

const credential = {
    email:"admin@gmail.com",
    password:"admin",
}

// const isLoggedIn = (req, res, next) => {
//     if (req.session.user) {
//       res.redirect('/dashboard');
//     }
//     next();
//   };

// const isLoggedOut = (req, res, next) => {
//     if (!req.session.user) {
//       res.redirect('/');
//     }
//     next();
//   };

router.use(nocache());

router.get("/",(req,res)=>{
    if(!req.session.user){
        res.render("base",{title:"Login System",login:"login for existing user's"});
    }else{
        res.redirect("/dashboard");
    }
});

router.post("/login",(req,res)=>{
    if(req.body.email!=credential.email && req.body.password!=credential.password){
        res.render("base",{title:'Login system',alert:"Username & password invalid!"});
        
    }else if(req.body.email!=credential.email){
        res.render("base",{title:'Login system',alert:"invalid email"})
        
    }else if(req.body.password!=credential.password){
        res.render("base",{title:'Login system',alert:"invalid password"})
    }else{
        if(req.body.email === credential.email && req.body.password === credential.password){
            req.session.user=req.body.email;
            res.redirect("/dashboard");
        }
    }
})


router.get("/dashboard",(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }else{
        res.redirect("/");
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render("base",{title:'see ya',logout:"logout successfull...!"});
        }
    })
})

module.exports = router; 