import jwt from "jsonwebtoken";
import { jwtKey } from "../config.js";
import User from "../DB/dbindex.js";
export default async function initialFetchMiddleware(req, res, next) {
  const data = req.body.token;
  const deviceID = req.body.deviceId;
  if (deviceID === undefined || deviceID === false) {
    return res.status(200).json({ msg: "DeviceId not reached" });
  }
  let send;
  try {
    send = jwt.verify(data, jwtKey);
    req.user_id = { id: send.user_id };
    try {
      const response = await User.findOne({ _id: send.user_id });
      req.response = { username: response.username, array: response.array };
      const arr = response.deviceInfoArray;
      const dec = arr.find((element) => element === deviceID);
      if (dec === false) {
        return res.status(411).json({ msg: "Nice try hacker, quite good one" }); // case when hacker will try to copy and store copied jwt in his/her localStorage and will try auto login
      }
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Oops! server down, can't fetch user data!!!" });
    }
    next();
  } catch (error) {
    return res
      .status(200)
      .json({ msg: "re-login, either token is expired or invalid" });
  }
}
