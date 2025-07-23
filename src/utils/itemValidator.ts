import { body } from "express-validator";

export const itemValidation = [
  body("name").notEmpty().withMessage("Name is required"),
];