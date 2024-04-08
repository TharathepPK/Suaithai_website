const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://nuchanardwebdesign:jCWEWMSC5y0nTrN9@suaithai.hfm63gp.mongodb.net/?retryWrites=true&w=majority&appName=Suaithai";
mongoose.connect(mongoUrl)
.catch((err)=> console.log(err))

const daySchema = mongoose.Schema({
   day:String,
   time:String
})

const dayModel = mongoose.model("dayModel",daySchema);

module.exports = dayModel; 