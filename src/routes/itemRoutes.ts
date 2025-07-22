import { createItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/itemController";
import express from "express";

export const itemRouter = express.Router();

itemRouter.post("/", createItem);
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", updateItem);
itemRouter.delete("/:id", deleteItem);

