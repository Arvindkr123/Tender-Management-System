import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../config/env.vars.js";

const generateToken = async (userId, res) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set token in cookies
  res.cookie("token", token, {
    httpOnly: true, // Try setting httpOnly to false
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    secure: true, // Try setting secure to true
    sameSite: "None", // Try setting sameSite to None
  });

  return token;
};

export default generateToken;
