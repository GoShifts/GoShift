import User from "../models/User.js";
import Token from "../models/Token.js";
import generateToken from "../utils/common.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import controller_constants from "./constants.js";
import environment from "../utils/environment.js";
import bcrypt from "bcrypt";
// import db from "mongo";

export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const url = `${environment.BASE_URL}auth/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(201).send({
      message: "Check your email for a verification link.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred, please try again" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      res.status(201).json({
        userId: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyToken = async (req, res) => {
  try {

    const { id, token } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: controller_constants.invalidLink });

    const foundToken = await Token.findOne({
      userId: user._id,
      token,
    });

    if (!foundToken) return res.status(400).send({ message: controller_constants.invalidLink });

    await Promise.all([
      User.updateOne({ _id: user._id }, { $set: { verified: true } }),
      Token.findOneAndDelete({
        userId: user._id,
        token,
      }),
    ]);

    res.status(200).send({ message: controller_constants.emailVerified });
  } catch (error) {
    res.status(500).send({ message: controller_constants.internalServerError });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    const resetUrl = `${environment.BASE_URL}reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Reset Password", resetUrl);

    return res.status(200).json({
      message: "A password reset email has been sent to your account",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error occurred, please try again" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const foundToken = await Token.findOneAndDelete({
      userId,
      token,
    });

    if (!foundToken) {
      return res.status(404).json({ message: "Invalid token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "User not existed" });
    }
    // console.log("before token");
    // const token = await new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    // }).save();
    // console.log("after token");
    // console.log(token);
    const url = `${process.env.BASE_URL}reset/${user.id}/${token}`;
    await sendEmail(user.email, "Reset Password", url);
    return res
      .status(400)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    res.status(500).send({ message: "Error Occured! try again" });
  }
};

export const resetPassword = async (req, res) => {
  console.log("reset password");
  try {
    console.log("try");
    const { id } = req.params;
    const { password } = req.body;
    console.log(id);
    console.log(token);
    console.log(password);
    const token = await Token.findOne({
      userId: id,
      token: req.params.token,
    });
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      console.log("verify");
      if (!token) {
        console.log("if");
        return res.status(500).send(err);
      } else {
        console.log("else");
        const user = User.findByIdAndUpdate(id, { password: password });
        if (user) {
          console.log("updated if");

          res.status(200).send({ message: "Password Updated Successfully" });
        } else {
          console.log("updated else");
          res.status(500).send(err);
        }
      }
    });
    res.status(200).send({ message: "Password Updated Successfully" });
  } catch (error) {
    console.log("catch");
    res.status(500).send({ message: "Error Occured! try again" });
  }
};
