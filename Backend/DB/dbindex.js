import mongoose, { Schema, model } from'mongoose'
mongoose.connect("mongodb://localhost:27017/Pass-Generator");
const schema = new Schema({
    username:String,
    password:String,
    array: Array,
    deviceInfoArray:Array||null,
    salt:String
    
})
 const User= model("User",schema)

 export default User;