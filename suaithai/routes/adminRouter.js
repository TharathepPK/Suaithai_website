const express = require("express");
const router = express.Router();
const multer = require("multer");

const pageModel = require("../models/pageModel");
const contactModel = require("../models/contactModel");
const dayModel = require("../models/dayModel");
const massageModel = require("../models/massageModel");

const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,"./public/images");
   },
   filename:(req,file,cb)=>{
      cb(null,Date.now() + ".jpg");
   }
})

const upload = multer({storage:storage});

router.post("/header-bg-save", upload.single("image"), (req,res)=>{
   const background =  req.file.filename;
   const filter = {page:"background"};
   const update = {
      $set:{
         "content.background":background
      }
   };
   const option = {new: true}
   pageModel.findOneAndUpdate(filter,update,option)
   .then((doc)=>{
      console.log(doc);
      res.redirect("/admin");
   })
   .catch((err)=>{
      console.log(err);
   })
})

router.post("/contact-save/:id",(req,res)=>{
   const id = req.params.id;
   const input = req.body;
   const filter = {_id:id};
   const update = {
      contact:input.contact,
      value:input.value,
      link:input.link
   };
   const option = {new: true};
   contactModel.findOneAndUpdate(filter,update,option)
   .then(()=>{
      res.redirect("/admin");
   })
})

router.get("/contact-create", async (req,res)=>{
   let highOrder;
   await contactModel.findOne().sort({order:-1})
   .then((docs)=>{
      highOrder = docs.order;
   })
   const newContact = {
      contact:"",
      value:"",
      link:"",
      order:highOrder+1
   };
   contactModel.create(newContact)
   .then(()=>{
      res.redirect("/admin")
   })
})

router.get("/contact-delete/:id",(req,res)=>{
   const id = req.params.id;
   const filter = {_id:id};
   contactModel.findOneAndDelete(filter)
   .then(()=>{
      res.redirect("/admin")
   })
})


router.post("/day-save/:id",(req,res)=>{
   const id = req.params.id;
   const input = req.body;
   const filter = {_id:id};
   const update = {
      day:input.day,
      time:input.time
   };
   const option = {new: true};
   dayModel.findOneAndUpdate(filter,update,option)
   .then(()=>{
      res.redirect("/admin");
   })
})

router.get("/day-create",(req,res)=>{
   const newDay = {
      day:"",
      time:""
   }
   dayModel.create(newDay)
   .then(()=>{
      res.redirect("/admin");
   })
   .catch((err)=>{
      console.log(err);
   })
})

router.get("/day-delete/:id",(req,res)=>{
   const id = req.params.id;
   const filter = {_id:id};
   dayModel.findOneAndDelete(filter)
   .then(()=>{
      res.redirect("/admin")
   })
})

router.post("/welcome-img-save", upload.single("image"), (req,res)=>{
   const image = req.file.filename;
   const filter = {page:"welcome"};
   const update = {
      "content.introduceImage":image
   };
   const option = {new: true};
   pageModel.findOneAndUpdate(filter,update,option)
   .then(()=>{
      res.redirect("/admin");
   })
})

router.post("/welcome-text-save",(req,res)=>{
   const input = req.body.text;
   const filter = {page:"welcome"};
   const update = {
      "content.introduceText":input
   };
   const option = {new: true};
   pageModel.findOneAndUpdate(filter,update,option)
   .then((doc)=>{
      console.log(doc);
      res.redirect("/admin");
   })
})

router.post("/massage-save/:id", upload.single("image"), (req,res)=>{
   const id = req.params.id;
   const input = req.body;
   const image = req.file;
   const package = [];
   for(let a = 0; a < input.min.length; a++){
      package.push({
         min:input.min[a],
         price:input.price[a]
      })
   }

   const filter = {
      _id:id
   };
   let update; 
   if(image){
      update = {
         image:image.filename,
         name:input.head,
         detail:input.detail,
         package:package
      };
   }else{
      update = {
         name:input.head,
         detail:input.detail,
         package:package
      }
   }
   const option = {new: true};

   massageModel.findOneAndUpdate(filter,update,option)
   .then((doc)=>{
      res.redirect("/admin")
   })
   .catch(err => console.log(err));
})

router.get("/massage-create",(req,res)=>{
   const newMassage = {
      image:"",
      name:"--",
      detail:"--",
      package:[
         {
            min:"--",
            price:"--"
         }
      ]
   }
   massageModel.create(newMassage)
   .then(()=>{
      res.redirect("/admin");
   })
   .catch(err => console.log(err));
})

router.get("/massage-delete/:id",(req,res)=>{
   const id = req.params.id;
   const filter = {_id:id};
   massageModel.findOneAndDelete(filter)
   .then(()=>{
      res.redirect("/admin");
   })
   .catch(err => console.log(err));
})

router.post("/discount-img-save", upload.single("image"), (req,res)=>{
   const image = req.file.filename;
   const filter = {page:"discount"};
   const update = {
      $push:{"content.image":image}
   }
   const option = {new :true};
   pageModel.findOneAndUpdate(filter,update,option)
   .then(()=>res.redirect("admin"))
   .catch((err)=>console.log(err));
})

router.get("/discount-img-delete/:index",(req,res)=>{
   const index = req.params.index;
   const filter = {page:"discount"};
   const update1 = {
      $unset:{[`content.image.${index}`]:index}
   }
   const update2 = {
      $pull:{"content.image": null}
   }
   pageModel.findOneAndUpdate(filter,update1)
   .then(()=>{
      return pageModel.findOneAndUpdate(filter,update2)
   })
   .then(()=>{
      res.redirect("/admin");
   })
   .catch(err => console.log(err));
})

router.post("/discount-text-save/:index",(req,res)=>{
   const index = req.params.index;
   const input = req.body;
   console.log(input.head);
   console.log(input.content);
   const filter = {page:"discount"};
   const update = {
      [`content.text.${index}`]:{
         "header":input.head,
         "content":input.content
      }
   } 
   pageModel.findOneAndUpdate(filter,update)
   .then(res.redirect("/admin"))
   .catch(err => console.log(err))
})

router.get("/discount-text-delete/:index",(req,res)=>{
   const index = req.params.index;
   const filter = {page:"discount"};
   const update1 = {
      $unset:{
         [`content.text.${index}`]:index
      }
   }
   const update2 = {
      $pull:{
         "content.text":null
      }
   }
   pageModel.findOneAndUpdate(filter,update1)
   .then(()=>{
      return pageModel.findOneAndUpdate(filter,update2)
   })
   .then(res.redirect("/admin"))
   .catch(err => console.log(err));
})

router.get("/discount-text-create",(req,res)=>{
   const filter = {page:"discount"};
   const update = {
      $push:{
         ["content.text"]:{
            header:"--",
            content:"--"
         }
      }
   };
   const option = {new: true};
   pageModel.findOneAndUpdate(filter,update,option)
   .then(res.redirect("/admin"))
   .catch(err=>console.log(err))
})

router.post("/gallery-img-save", upload.single("image"), (req,res)=>{
   const image = req.file.filename;
   const filter = {page:"gallery"};
   const update = {
      $push:{
         ["content.image"]:image
      }
   }
   const option = {new: true}
   pageModel.findOneAndUpdate(filter,update,option)
   .then(res.redirect("/admin"))
})

router.get("/gallery-img-delete/:index",(req,res)=>{
   const index = req.params.index;
   const filter = {page:"gallery"};
   const update1 = {
      $unset:{
         [`content.image.${index}`]: index
      }
   }
   const update2 = {
      $pull:{
         ["content.image"]: null
      }
   }
   pageModel.findOneAndUpdate(filter, update1)
   .then(()=>{
      return pageModel.findOneAndUpdate(filter, update2)
   })
   .then(res.redirect("/admin"))
   .catch(err => console.log(err));
})


module.exports = router;