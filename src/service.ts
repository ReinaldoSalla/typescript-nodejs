import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";
import { NegotiationModel } from "./model";
import { httpStatus } from "./http-status";

export class Service {
    public renderWelcomeMessage(req: Request, res: Response): void {
        res.status(200).send("REST API implemented with TypeScript and NodeJS");
        console.log("GET method for base route")
    }

    public getOneNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        console.log(`GET method for negotiation with id = ${negotiationId}`);
        NegotiationModel.findById(negotiationId, (err: Error, negotiationFounded: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            res.status(httpStatus.ok).json(negotiationFounded);
        });
    }

    public getAllNegotiations(req: Request, res: Response): void {
        NegotiationModel.find({}, (err: Error, negotiation: MongooseDocument) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            console.log("GET method for all negotiations");
            res.status(httpStatus.ok).json(negotiation);
        });
    }

    public postNewNegotiation(req: Request, res: Response): void {
        /*
        Validations: 
        year must be 2020
        amount has to be bigger then 1
        value has to be bigger then 10
        description must have more then 10 chars
        */
        /*
        const date: Date = req.body.date;
        const amount: number = req.body.amount;
        const value: number = req.body.value;
        const description: string = req.body.description;
        if(value > 1000) console.log("value was bigger then 1000");
        */
       /*
        let msgs = [];
        let flagError = false;
        if(req.body.amount < 1) {
            msgs.push("Amount must be at least 1");
            flagError = true;
        }
        if(req.body.value < 10) {
            msgs.push("Value must be at least 10"); 
            flagError = true;
        }
        if(req.body.description.length < 10) {
            msgs.push("Description must have at least 10 characters");
            flagError = true
        }
        if(flagError) {
            console.log("POST canceled");
            msgs.forEach(msg => console.log(msg));
            res.status(400).send("POST canceled");
        } else {
            const negotiationModel = new NegotiationModel(req.body);
            negotiationModel.save((err: Error, negotiation: MongooseDocument) => {
                if(err) res.status(httpStatus.badRequest).send(err);
                console.log("POST method for a new negotiation");
                res.status(httpStatus.created).json(negotiation);
            });
        }
        */
        
        const negotiationModel = new NegotiationModel(req.body);
        negotiationModel.save((err: Error, negotiation: MongooseDocument) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            console.log("POST method for a new negotiation");
            res.status(httpStatus.created).json(negotiation);
        });
        
    }

    public postNewNegotiationWithDate(req: Request, res: Response): void {
        /*
        It returns with date and without _id and _v in postman
        But is save the usual way, with the _id and _v and without date
        */
        const negotiationModel = new NegotiationModel(req.body);
        const date = "2010-01-01";
        const negotiationModelWithDate = {...req.body, date};
        negotiationModel.save((err: Error, negotiation: MongooseDocument) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            console.log("POST method for a new negotiation with a predetermined date");
            res.status(httpStatus.created).json(negotiationModelWithDate);
        });
    }

    public putNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        console.log(`PUT method for negotiation with id ${negotiationId}`);
        NegotiationModel.findByIdAndUpdate(negotiationId, req.body, (err: Error, negotiationUpdated: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg = negotiationUpdated ? "Updated sucessfully" : "Negotiation not found";
            res.status(httpStatus.noContentUpdated).json(negotiationUpdated);
        });
    }

    public deleteNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        console.log(`DELETE method for negotiation with id ${negotiationId}`);
        NegotiationModel.findByIdAndDelete(negotiationId, (err: Error, deleted: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg = deleted ? "Deleted sucessfully" : "Negotiation not found";
            res.status(httpStatus.noContentDeleted).send(msg);
        });
    }
}
