import { createItem, getItems } from "../controllers/itemController";
import express from "express";

export const itemRouter = express.Router();

itemRouter.post("/", createItem);
itemRouter.get("/", getItems);

