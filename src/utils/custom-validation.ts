/*
This would be the hardcoded alternative to express-validator
*/

import { Request } from "express";

export function checkValidation(req: Request) {
    const isDateValid: boolean = req.body.date.slice(0, 4) === "2020" ? true : false;
    const isAmountValid: boolean = req.body.amount >= 1 ? true : false;
    const isValueValid: boolean = req.body.value >= 10 ? true : false;
    const isDescriptionValid: boolean = req.body.description.length > 10 ? true : false;

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

// Optimized version to check is a paricular field is missing in the JSON body, or if it is a empty string
/*
export function checkValidation(req: Request) {
    var isDateValid: boolean = false;
    var isAmountValid: boolean = false;
    var isValueValid: boolean = false;
    var isDescriptionValid: boolean = false;
    const isDatePresent: boolean = req.body.date !== undefined ? true : false;
    const isAmountPresent: boolean = req.body.amount !== undefined ? true: false;
    const isValuePresent: boolean = req.body.value !== undefined ? true : false;
    const isDescriptionPresent: boolean = req.body.description !== undefined ? true : false;
    if(!isDatePresent) isDateValid = req.body.date.slice(0, 4) === "2020" ? true : false;
    if(!isAmountPresent) isAmountValid = req.body.amount > 1 ? true : false;
    if(!isValuePresent) isValueValid = req.body.value > 10 ? true : false;
    if(!isDescriptionPresent) isDescriptionValid = req.body.description.length > 10 ? true : false;

    interface Validation {
        name: string,
        msg: string,
        isValid: boolean
    }

    const validationDateEmpty: Validation = {
        name: "date-empty",
        msg: "The Date cannot be empty",
        isValid: isDatePresent
    }

    const validationAmountEmpty: Validation = {
        name: "amount-empty",
        msg: "The Amount cannot be empty",
        isValid: isDatePresent
    }

    const validationValueEmpty: Validation = {
        name: "value-empty",
        msg: "The value cannot be empty",
        isValid: isDatePresent
    }

    const validationDescriptionEmpty: Validation = {
        name: "description-empty",
        msg: "The Description cannot be empty",
        isValid: isDatePresent
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
        validationDateEmpty,
        validationAmountEmpty,
        validationValueEmpty,
        validationDescriptionEmpty,
        validationDate,
        validationAmount,
        validationValue,
        validationDescription
    ];

    return validations.filter(field => !field.isValid);
}
*/

// This is how checkValidation can be called in service.ts
/*
public postNewNegotiation(req: Request, res: Response): void {
    const errors = checkValidation(req)
    if(errors.length) {
        res.status(httpStatus.badRequest).json(errors);
    } else {
        const negotiationModel = new NegotiationModel(req.body);
        negotiationModel.save((err: Error, negotiation: MongooseDocument) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg: string = "POST method for a new negotiation"
            logger.info(msg); console.log(msg);
            res.status(httpStatus.created).json(negotiation);
        });
    }
}
*/