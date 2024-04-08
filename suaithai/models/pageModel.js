const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://nuchanardwebdesign:jCWEWMSC5y0nTrN9@suaithai.hfm63gp.mongodb.net/?retryWrites=true&w=majority&appName=Suaithai";
mongoose.connect(mongoUrl)
.catch((err)=> console.log(err))

const pageSchema = mongoose.Schema({
   page:String,
   content:Object
})

const pageModel = mongoose.model("pageModel",pageSchema);

module.exports = pageModel; 