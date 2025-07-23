import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/itemController";
import express, { Request, Response } from "express";
import { itemValidation } from "../utils/itemValidator";
import { validationResult } from "express-validator";

export const itemRouter = express.Router();

itemRouter.post("/", itemValidation, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Create item failed.",
      errors: errors.array(),
    });
  }
  createItem(req, res);
});
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", updateItem);
itemRouter.delete("/:id", deleteItem);
