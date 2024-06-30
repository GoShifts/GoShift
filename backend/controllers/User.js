import User from "../models/User.js";
import Token from "../models/Token.js";
import generateToken from "../utils/common.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import environment from "../utils/environment.js";
import bcrypt from "bcrypt";
// import db from "mongo";

export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    // no signup option therefor no email verification required
    // const token = await new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    // }).save();
    // const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;
    // await sendEmail(user.email, "Verify Email", url);
    // console.log(user._id);

    res.status(201).send({
      token: generateToken(user._id),
      message: "An Email sent to your account please verify",
    });
    // res.status(200).json({
    //   token: generateToken(user._id),
    // });
  } catch (error) {
    res.status(500).json({
      message: "Error! try again",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    
    // return res.status(200).json({ message: "Invalid Username or Password"+user.password+ password});
    
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const result = await bcrypt.compare(password, user.password);
    
    // return res.status(200).json(result);
    
    if (user && result) {
      res.status(201).json({
        userId: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const verifyToken = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log("user" + user);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log("token" + token);
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // const response = await User.updateOne({ _id: user._id, verified: true });
    // console.log("upadted: "+response);
    // await Token.findOneAndDelete({
    //   userId: user._id,
    //   token: req.params.token,
    // });

    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    console.log("updated");
    await Token.findOneAndDelete({
      userId: user._id,
      token: req.params.token,
    });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.send({ message: "User not existed" });
    }
    
    const url = `${environment.BASE_URL}reset/${user._id}`;
    await sendEmail(user.email, "Reset Password", url);
    return res
      .status(200)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    res.status(500).send({ message: "Error Occured! try again" });
  }
};



export const staffforgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.send({ message: "User not existed" });
    }
    
    const url = `${environment.BASE_URL}reset/staff/${user._id}`;
    await sendEmail(user.email, "Reset Password", url);
    return res
      .status(200)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    res.status(500).send({ message: "Error Occured! try again" });
  }
};

export const resetPassword = async (req, res) => {
  // console.log("reset password");
  try {
    console.log("try");
    const { id } = req.params;
    const { password } = req.body;

      // console.log("else");
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      
      

       // Update the user's password
    const user = await User.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    );
      
      console.log(user);
      if (user) {
        // console.log("updated if");
        res.status(200).send({ message: "Password Updated Successfully"});
      } else {
        // console.log("updated else");
        res.status(500).send(err);
      }
    
  } catch (error) {
    console.log("catch");
    res.status(500).send({ message: "Error Occured! try again" });
  }
};

export const satffresetPassword = async (req, res) => {
  // console.log("reset password");
  try {
    console.log("try");
    const { id } = req.params;
    const { password } = req.body;

    //   // console.log("else");
    //   const salt = await bcrypt.genSalt(10);
    //   const newPassword = await bcrypt.hash(password, salt);
      const newPass= password;
      

       // Update the user's password
    const user = await User.findByIdAndUpdate(
      id,
      { password: newPass },
      { new: true }
    );
      
      console.log(user);
      if (user) {
        // console.log("updated if");
        res.status(200).send({ message: "Password Updated Successfully"});
      } else {
        // console.log("updated else");
        res.status(500).send(err);
      }
    
  } catch (error) {
    console.log("catch");
    res.status(500).send({ message: "Error Occured! try again" });
  }
};


