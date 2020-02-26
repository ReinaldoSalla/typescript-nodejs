import { check } from "express-validator";

export const validations = [
    check("amount").isInt({ min: 1 }).withMessage("amount must be at least 1"),
    check("value").isInt({ min: 1 }).withMessage("value must be at least 1"),
    check("description").isLength({ min: 5}).withMessage("description must be at least 5 characters long")
];