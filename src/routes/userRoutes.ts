import express, { NextFunction, Request, Response } from "express";
import { getUserProfile } from "../controllers/userController";
import { checkAuth } from "../middlewares/authMiddleware";

export const userRoutes = express.Router();

userRoutes.get("/", checkAuth, getUserProfile);

