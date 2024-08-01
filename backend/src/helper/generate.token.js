import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../config/env.vars.js";

const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set token in cookies
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    secure: NODE_ENV === "production",
  });

  return token;
};

export default generateToken;
