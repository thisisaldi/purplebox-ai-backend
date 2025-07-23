import { Response } from "express";
import { User } from "../models/Users";
import { AuthRequest } from "../types/authRequest";
import { Item } from "../models/Items";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("_id name email");

    if (!user) return res.status(404).json({ message: "User not found" });
    const items = await Item.find({ owner: user._id }).select(
      "_id name description"
    );
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      items,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};
