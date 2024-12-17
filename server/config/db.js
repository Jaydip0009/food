const mongoose = require ('mongoose')

const dbconnect = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/food")
    console.log("connnected");
}

module.exports = dbconnect