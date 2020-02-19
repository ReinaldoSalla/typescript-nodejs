import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";
import { NegotiationModel } from "./model";
import { httpStatues } from "./properties";

export class Service {
    public renderWelcomeMessage(req: Request, res: Response): void {
        res.status(200).send("REST API implemented with TypeScript and NodeJS");
        console.log("GET method for base route")
    }

    public getAllNegotiations(req: Request, res: Response): void {
        NegotiationModel.find({}, (err: Error, negotiation: MongooseDocument) => {
            if(err) res.send(err);
            console.log("GET method for all negotiations");
            res.status(httpStatues.ok).json(negotiation);
        })
    }

    public addNewNegotiation(req: Request, res: Response): void {
        const negotiationModel = new NegotiationModel(req.body);
        negotiationModel.save((err: Error, negotiation: MongooseDocument) => {
            if(err) res.send(err);
            console.log("POST method for a new negotiation");
            res.status(httpStatues.created).json(negotiation);
        });
    }

    public updateNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        console.log(`UPDATE method for negotiation with id ${negotiationId}`);
        NegotiationModel.findByIdAndUpdate(
            negotiationId,
            req.body,
            (err: Error, negotiation: any) => {
                if(err) res.send(err);
                const msg = negotiation ? "Updated sucessfully" : "Negotiation not found";
                res.send(msg);
            }
        );
    }

    public deleteNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        console.log(`DELETE method for negotiation with id ${negotiationId}`);
        NegotiationModel.findByIdAndDelete(negotiationId, (err: Error, deleted: any) => {
            if(err) res.send(err);
            const msg = deleted ? "Deleted sucessfully" : "Negotiation not found";
            res.send(msg);
        });
    }
}
