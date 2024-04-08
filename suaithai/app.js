const express = require("express");
const app = express();
const router = require("./routes/mainRouter");
const adminRouter = require("./routes/adminRouter");
const cookieParser = require("cookie-parser");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static("./public"));

const dayModel = require("./models/dayModel");
const contactModel = require("./models/contactModel");
const pageModel = require("./models/pageModel");

app.use(async (req,res,next)=>{
   try{
      const day = await dayModel.find();
      const contact = await contactModel.find().sort({order:1});
      res.locals.days = day;
      res.locals.contacts = contact;
      await pageModel.findOne({page:"background"}).then((doc)=>{
         const background = doc.content.background;
         res.locals.background = background;
      });
      next();
   } catch (err){
      next(err);
   }
})

app.use(router);
app.use(adminRouter);

app.listen(3000);