import { Request, Response } from "express";
import { User } from "../models/Users";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ token });
  } catch (err) {
    console.log("Register: " + err);
    res.status(500).send("Server error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials: email not found." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials: wrong password." });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ token });
  } catch (err) {
    console.log("Login: " + err);
    res.status(500).send("Server error");
  }
};
