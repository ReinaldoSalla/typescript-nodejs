/*
Validations: 
    year must be 2020
    amount has to be at least 1
    value has to be at least 10
    description must be at least 10 characters long
*/

import { Request } from "express";

export function checkValidation(req: Request) {
    const isDateValid: boolean = req.body.date.slice(0, 4) === "2020" ? true : false
    const isAmountValid: boolean = req.body.amount > 1 ? true : false
    const isValueValid: boolean = req.body.value > 10 ? true : false
    const isDescriptionValid: boolean = req.body.description.length > 10 ? true : false
    
    interface Validation {
        name: string,
        msg: string,
        isValid: boolean
    }

    const validationDate: Validation = {
        name: "date",
        msg: "The year should be 2020",
        isValid: isDateValid
    };

    const validationAmount: Validation = {
        name: "amount",
        msg: "The amount must be at least 1",
        isValid: isAmountValid
    };

    const validationValue: Validation = {
        name: "value",
        msg: "Value must be at least 10",
        isValid: isValueValid
    }

    const validationDescription: Validation = {
        name: "description",
        msg: "Description should be at least 10 caracters long",
        isValid: isDescriptionValid
    };

    const validations: Validation[] = [
        validationDate,
        validationAmount,
        validationValue,
        validationDescription
    ];

    return validations.filter(field => !field.isValid);
}
