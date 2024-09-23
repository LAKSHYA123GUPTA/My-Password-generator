import mongoose, { Schema, model } from "mongoose";

export async function dbConnect(uri) {
  try {
    if (!uri) {
      console.log("uri", uri);
      throw new Error("URI not available from environment variables.");
    }
    const response = await mongoose.connect(uri,{
      dbName : "passGen"
    });
    return response.connection.readyState;
  } catch (error) {
    console.error(error);
  }
}

const schema = new Schema({
  username: String,
  password: String,
  array: Array,
  deviceInfoArray: Array || null,
  salt: String,
});
const User = model("User", schema);

export default User;
