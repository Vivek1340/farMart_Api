import jwt from "jsonwebtoken";
import utils from "../utils.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, utils.JWT_SECRET); //secret key
      req.userId = decodedData?.id;
      req.email = decodedData?.email;
    } else {
      res.status(404).json({ message: "TOKEN_ERR" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "TOKEN_ERR" });
  }
};

export default auth;
