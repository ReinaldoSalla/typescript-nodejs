import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";
import { NegotiationModel } from "./model";
import { httpStatus } from "./http-status";
import { logger } from "./logger";
import { validationResult } from "express-validator";

export class Service {
    public renderWelcomeMessage(req: Request, res: Response): void {
        console.log("GET method for base route");
        res.status(200).send("REST API implemented with TypeScript and NodeJS");
    }

    public getOneNegotiation(req: Request, res: Response): void {
        const negotiationId: string = req.params.id;
        const msg: string = `GET method for negotiation with id = ${negotiationId}`;
        logger.info(msg); console.log(msg);
        NegotiationModel.findById(negotiationId, (err: Error, negotiationFounded: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            res.status(httpStatus.ok).json(negotiationFounded);
        });
    }

    public getAllNegotiations(req: Request, res: Response): void {
        NegotiationModel.find({}, (err: Error, negotiation: MongooseDocument) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg: string = "GET method for all negotiations";
            logger.info(msg); console.log(msg);
            res.status(httpStatus.ok).json(negotiation);
        });
    }

    public postNewNegotiation(req: Request, res: Response): any {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const msg: string = "Error during POST method for route /negotiation"
            logger.info(msg); console.log(msg);
            return res.status(httpStatus.unprocessableEntity).json({ errors: errors.array() });
        }
        const negotiationModel = new NegotiationModel(req.body);
        negotiationModel.save((err: Error, negotiation: MongooseDocument) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            const msg: string = "POST method for a new negotiation"
            logger.info(msg); console.log(msg);
            res.status(httpStatus.created).json(negotiation);
        });
    }


    public putNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        let msg = `PUT method for negotiation with id ${negotiationId}`;
        logger.info(msg); console.log(msg);
        NegotiationModel.findByIdAndUpdate(negotiationId, req.body, (err: Error, updated: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            msg = updated ? "Updated sucessfully through PUT method" : "Negotiation not found";
            res.status(httpStatus.noContentUpdated).send(msg);
        });
    }

    public patchNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        let msg = `PATCH method for a negotiations with id ${negotiationId}`;
        logger.info(msg); console.log(msg);
        NegotiationModel.findByIdAndUpdate(negotiationId, req.body, (err: Error, updated: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            msg = updated ? "Updated sucessfully through PUTCH" : "Negotiation not found";
            res.status(httpStatus.noContentUpdated).send(msg);
        })
    }

    public deleteNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        let msg = `DELETE method for negotiation with id ${negotiationId}`;
        logger.info(msg); console.log(msg);
        NegotiationModel.findByIdAndDelete(negotiationId, (err: Error, deleted: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            msg = deleted ? "Deleted sucessfully" : "Negotiation not found";
            res.status(httpStatus.noContentDeleted).send(msg);
        });
    }
}