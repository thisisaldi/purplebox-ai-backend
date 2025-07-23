import { Request, Response } from "express";
import { Item } from "../models/Items";

export const createItem = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const newItem = new Item({
      name,
      description,
    });

    const savedItem = await newItem.save();
    res.status(201).json({
      message: "Success",
      item: savedItem,
    });
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await Item.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const items = await Item.find()
      .select("_id name description")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      page,
      totalItems,
      totalPages,
      items,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).select(
      "_id name description"
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name || item.name;
    item.description = description || item.description;

    await item.save();
    res.json({
      message: "Success",
      item,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err: unknown) {
    res.status(500).send({ message: "Server error" });
  }
};
