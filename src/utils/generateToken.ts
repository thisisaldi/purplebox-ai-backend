import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};