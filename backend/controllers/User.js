import User from "../models/User.js";
import Token from "../models/Token.js";
import generateToken from "../utils/common.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

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
  //   console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
        }

        return res
          .status(400)
          .send({ message: "An Email sent to your account please verify" });
      }

      ///////
      console.log(user);
      res.status(201).json({
        token: generateToken(user._id),
        // message: "Loged in Successfull",
      });
    } else {
      res.status(401).send("Invalid Username or Password");
    }
  } catch (error) {
    res.status(500).json("catch " + error);
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

    await User.updateOne({ _id: user._id, verified: true });
    await Token.findOneAndDelete({
      userId: user._id,
      token: req.params.token,
    });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};