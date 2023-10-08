import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//ROUTES
import userRoutes from "./routes/users.js";
import utils from "./utils.js";
import fileRoutes from "./routes/file.js";
import "./autoDelete.js";

const app = express();
console.log(utils)

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/file", fileRoutes);

//Connection of MONGODB

const MONGO_CONNECTION_URL = utils.MONGO_CONNECTION_URL;
const PORT = utils.PORT;

mongoose
  .connect(MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`MongoError`);
    console.log(e.message);
  });
