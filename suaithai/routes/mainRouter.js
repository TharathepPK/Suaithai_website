const express = require("express");
const router = express.Router();
const pageModel = require("../models/pageModel");
const massageModel = require("../models/massageModel");
const cookieParser = require("cookie-parser");

router.get("/",(req,res)=>{
   pageModel.findOne({page:"welcome"})
   .then((doc)=>{
      res.render("welcome.ejs",{content:doc});
   })
})

router.get("/massagen",(req,res)=>{
   massageModel.find()
   .then((doc)=>{
      res.render("massage.ejs",{content:doc});
   })
})
router.get("/gutscheine",(req,res)=>{
   pageModel.findOne({page:"discount"})
   .then((doc)=>{
      res.render("discount.ejs",{content:doc.content});
   })
})
router.get("/galerie",(req,res)=>{
   pageModel.findOne({page:"gallery"})
   .then((doc)=>{
      res.render("gallery.ejs",{content:doc.content});
   })
})

router.get("/login",(req,res)=>{
   res.render("login");
})

router.post("/password",(req,res)=>{
   const input = req.body;
   if(input.password == "jCWEWMSC5y0nTrN9"){
      const time = new Date(Date.now() + 1000 * 60 * 60 *60 * 24 * 7);
      res.cookie("admin","admin",{expires:time});
      res.redirect("/admin");
   }else{
      res.redirect("/login");
   }
})

router.get("/admin",async(req,res)=>{
   if(req.cookies.admin){
      const welcome = await pageModel.findOne({page:"welcome"});
      const massage = await massageModel.find();
      const discount = await pageModel.findOne({page:"discount"});
      const gallery = await pageModel.findOne({page:"gallery"});
      const pages = {welcome:welcome, massage:massage, discount:discount, gallery:gallery};
      res.render("admin.ejs",{pages:pages});
   }else{
      res.redirect("/login");
   }
})

module.exports = router;