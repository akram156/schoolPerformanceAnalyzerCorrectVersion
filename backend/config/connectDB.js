const mongoose=require("mongoose")
const connectDB=async() =>{
  try{
    await mongoose.connect(process.env.DB_URI)
    console.log("database connected")
  }
  catch(e){
    console.log(`could not connect because of: ${e}`)
  }
}

module.exports =connectDB