import express, { NextFunction, Request, Response } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { registerValidation } from "../utils/authValidator";
import { validationResult } from "express-validator";

export const authRouter = express.Router();

authRouter.post("/register", registerValidation, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  registerUser(req, res);
});

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

