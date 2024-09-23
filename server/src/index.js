import express from "express";
import router from "./routes/user.routes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", router);

app.get("/", (req, res) => {
  res.send("Perfect Health").status(200);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong! Please try again later.",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

app.listen(port, () => {
  console.log("Server is running at:", "http://localhost:" + port);
});
