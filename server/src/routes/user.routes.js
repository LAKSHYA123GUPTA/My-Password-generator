import { Router } from "express";
import z from "zod";
import User from "../db/index.js";
import siginMidlleware from "../middlewares/userAuth.middleware.js";
import jwt from "jsonwebtoken";
import initialFetchMiddleware from "../middlewares/fetchDevId.middleware.js";
import { jwtKey } from "../config.js";

const validSchema = z.object({
  username: z.string(),
});
const router = Router();
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.pass;
  const deviceID = req.body.deviceId;
  const remember = req.body.remember;
  const salt = req.body.salt;

  let arr;
  if (remember === true) {
    arr = [deviceID];
  } else arr = null;
  const response = await User.findOne({ username: username });
  if (response)
    return res.status(200).json({
      msg: "User or the same username already exists!!, choose another username or try Signing in",
    });
  const check = validSchema.safeParse({ username, password });
  if (!check.success) {
    return res.status(403).json({ msg: "Invalid inputs!!" });
  }

  try {
    const user = await User.create({
      username: username,
      password: password,
      array: [],
      deviceInfoArray: arr,
      salt: salt,
    });
    const id = user._id.toString();

    const token = jwt.sign({ user_id: id }, jwtKey);
    return res.status(200).json({ msg: "User created successfully", token,array:user.array });
  } catch (error) {
    return res.status(500).json({ msg: "Oops! server down, try later" });
  }
});
router.post("/signin", siginMidlleware, (req, res) => {
  const username = req.body.username;
  const id = req.user_id.id;
  const passArray = req.array.passArray;

  const token = jwt.sign({ user_id: id }, jwtKey);
  res.status(200).json({msg:"User signed in successfully", token: token, array: passArray });
});
router.post("/data", async (req, res) => {
  const username = req.body.username;
  try {
    const response = await User.findOne({ username: username });
    if (response) return res.json({ salt: response.salt });

    return res.status(411).json({
      msg: "Invalid credentials, check your credentials or try signup first /data",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Oops! server down can't fetch your data" });
  }
});
router.post("/auto", initialFetchMiddleware, async (req, res) => {
  return res.status(200).json({
    msg: "Allow auto-login",
    username: req.response.username,
    array: req.response.array,
  });
});

router.post("/manager", async (req, res) => {
  const passArray = req.body.Array;
  const data = req.body.token;
  let send;
  try {

    send = jwt.verify(data, jwtKey);

  } catch (error) {
    return res.status(200).json({ msg: "re-login, either token is expired or invalid" });
      
      
  }
  const id = send.user_id;
  try {
    const response = await User.updateOne(
      { _id: id },
      {               
        $set: {
          array: passArray,
        }
      }
    );
    if (response.array.length !== 0) {
      return res.status(200).json({ msg: "Array inserted!!!" });
    } else
      return res.status(200).json({ msg: "Array haven't inserted yet!!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Oops! serever down, can't upload user data!!!" });
  }
});
router.post("/password", async (req, res) => {
  const take = req.body.token; //
  const tk = take
    .split("")
    .filter((char) => char !== "." && char !== "-")
    .join("");
  const sp = "@#!$&";
  const lenSp = sp.length;
  const size = parseInt(req.body.size); //
  const n = parseInt(req.body.sp); //
  const lenToken = tk.length;
  let str = "";

  for (let index = 0; index < size; index++) {
    const w = tk[Math.floor(lenToken * Math.random())];
    str = str + w;
  }
  for (let index = 0; index < n; index++) {
    const d = sp[Math.floor(Math.random() * lenSp)];
    const n = str[Math.floor(Math.random() * size)];
    str = str.replace(n, d);
  }

  res.status(200).json({ Generated_Password: str });
});
export default router;
// function generator(){
//     const take= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVlY2pjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWtqaGhkY2pidSIsImlhdCI6MTcwNjU0ODI0N30.aK8Uxn2bffLrcY1BoDM7Vfv9Ly1_6SPBERIM99POZ2s";//
// const tk= take.split('').filter(char => char !== '.').join('');
//     const sp="@#!$&";//
//     const lenSp=sp.length;
//     const size=8;//
//     const n=3;//
//     const lenToken=tk.length;
//     let str="";
//     for (let index = 0; index < size; index++) {
//         const w=tk[Math.floor(lenToken*Math.random())];
//         str=str+w;

//     }
//     for (let index = 0; index < n; index++) {
//        const d=sp[Math.floor(Math.random()*lenSp)];
//        const n=str[Math.floor(Math.random()*size)];
//         str=str.replace(n,d);
//     }
//     console.log(str);

// }
// generator();
