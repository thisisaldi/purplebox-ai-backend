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
      item: savedItem
    });
  } catch (err) {
    console.error("Create Item Error: ", err);
    res.status(500).send("Server error");
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().select("_id name description");
    res.json(items);
  } catch (err) {
    console.log("Get Items Error : " + err);
    res.status(500).send("Server error");
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.name = name || item.name;
    item.description = description || item.description;

    await item.save();
    res.json({
      message: "Success",
      item
    }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await Item.findByIdAndDelete(req.params.id); 
    res.json({ msg: "Item deleted successfully" });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Delete Item Error:", error.message);
    res.status(500).send("Server error");
  }
};
