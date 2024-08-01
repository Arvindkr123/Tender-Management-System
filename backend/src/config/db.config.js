import mongoose from "mongoose";
import { MONGO_URI } from "./env.vars.js";

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    const connection = await mongoose.connect(MONGO_URI);
    console.log(
      "Database connection established at",
      connection.connection.host
    );
  } catch (error) {
    console.log("Error: while connecting to database", error);
    process.exit(1);
  }
};

export default connectDB;
