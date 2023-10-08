import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_CONNECTION_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
};
