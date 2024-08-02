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
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
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
        user: {
          name: existedUser.name,
          email: existedUser.email,
          role: existedUser.role,
          token,
        },
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

export const logoutCurrentUserController = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "logout successfully" });
};

export const getCurrentUserProfileController = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
