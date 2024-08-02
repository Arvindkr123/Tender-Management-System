import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.vars.js";
import UserModel from "../models/user.models.js";

const authenticateUser = async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = await jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      req.user = await UserModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return res.status(401);
    }
  } else {
    return res.status(401);
  }
};

export const authrizeAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export default authenticateUser;
