import { Response } from "express";
import { User } from "../models/Users";
import { AuthRequest } from "../types/authRequest";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("_id name email");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};