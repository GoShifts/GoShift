import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, { expiresIn: "60m" });
};

export default generateToken;
