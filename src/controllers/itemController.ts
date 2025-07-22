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
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Create Item Error: ", err);
    res.status(500).send("Server error");
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.log("Get Items : " + err);
    res.status(500).send("Server error");
  }
};
