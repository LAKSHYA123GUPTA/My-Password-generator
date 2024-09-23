import express from "express";
import router from "./routes/user.routes.js";
import cors from "cors";
import { dbConnect } from "./db/index.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") }); // Ensure the .env path is correctly resolved

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", router);

app.get("/", (req, res) => {
  res.status(200).send("Perfect Health"); // Fixed order of send and status
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong! Please try again later.",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

app.listen(port, async () => {
  const uri = process.env.DATABASE_URL;
  const result = await dbConnect(uri);
  if (result !== 1) {
    console.error("Couldn't connect to database, exiting process");
    process.exit(1);
  }
  console.log("Server is running at:", "http://localhost:" + port);
});
