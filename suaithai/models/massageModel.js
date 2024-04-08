const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://nuchanardwebdesign:jCWEWMSC5y0nTrN9@suaithai.hfm63gp.mongodb.net/?retryWrites=true&w=majority&appName=Suaithai";
mongoose.connect(mongoUrl)
.catch((err)=> console.log(err))

const massageSchema = mongoose.Schema({
   image:String,
   name:String,
   detail:String,
   package:Array
})

const massageModel = mongoose.model("massage",massageSchema);

module.exports = massageModel;