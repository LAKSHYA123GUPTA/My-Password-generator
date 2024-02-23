import express from "express"
import router from "./Routes/user.js";
import cors from "cors"
const app=express();
const port=3000;
app.use(cors());
app.use(express.json());
app.use("/user",router);
app.listen(port);