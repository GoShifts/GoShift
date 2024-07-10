import jwt from "jsonwebtoken";
import environment from "./environment.js";

const generateToken = (id) => {
  return jwt.sign({id}, environment.SECRET_KEY, { expiresIn: "60m" });
};

export default generateToken;
