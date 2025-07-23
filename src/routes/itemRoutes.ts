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
import { checkAuth } from "../middlewares/authMiddleware";

export const itemRouter = express.Router();

itemRouter.post("/", checkAuth, itemValidation, (req: Request, res: Response) => {
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
itemRouter.put("/:id", checkAuth, updateItem);
itemRouter.delete("/:id", checkAuth, deleteItem);
