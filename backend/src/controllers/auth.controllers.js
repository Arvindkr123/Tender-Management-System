import generateToken from "../helper/generate.token.js";
import UserModel from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ success: false, error: "Please fill all fields" });
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, error: "User already exists!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(user);

    try {
      // generate the token
      const token = await generateToken(user._id, res);
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
        token,
      });
    } catch (error) {
      console.log("Error generating token:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required!" });
    }

    const existedUser = await UserModel.findOne({ email });
    //console.log(existedUser);
    if (!existedUser) {
      return res
        .status(404)
        .json({ success: false, error: "invalid credentials!" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existedUser.password
    );

    // console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, error: "invalid credentials!" });
    }

    try {
      // generate the token
      const token = await generateToken(existedUser._id, res);
      res.status(201).json({
        success: true,
        message: "login user successfully!",
        token,
      });
    } catch (error) {
      console.log("Error generating token:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } catch (error) {
    console.log("Error : while login user", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const verifyTokenController = async (req, res, next) => {
  try {
    console.log(req.headers);
  } catch (error) {
    console.log(error);
  }
};
