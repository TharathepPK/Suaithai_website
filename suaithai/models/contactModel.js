const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://nuchanardwebdesign:jCWEWMSC5y0nTrN9@suaithai.hfm63gp.mongodb.net/?retryWrites=true&w=majority&appName=Suaithai";
mongoose.connect(mongoUrl)
.catch((err)=> console.log(err))

const contactSchema = mongoose.Schema({
   contact:String,
   value:String,
   link:String,
   order:Number
})

const contactModel = mongoose.model("contactModel",contactSchema);

module.exports = contactModel; 