import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";
import { NegotiationModel } from "./model";
import { httpStatus } from "./http-status";
import { checkValidation } from "./utils/check-validation";
import { logger } from "./logger";

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
            const msg: string = "POST method for a new negotiation with a predetermined date";
            logger.info(msg); console.log(msg);
            res.status(httpStatus.created).json(negotiationModelWithDate);
        });
    }

    public putNegotiation(req: Request, res: Response): void {
        /*
        It sends the previus data, not the updated data
        Thus, negotiationUpdated hold the last not the new
        */
        const negotiationId = req.params.id;
        let msg = `PUT method for negotiation with id ${negotiationId}`;
        logger.info(msg); console.log(msg);
        NegotiationModel.findByIdAndUpdate(negotiationId, req.body, (err: Error, updated: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            msg = updated ? "Updated sucessfully" : "Negotiation not found";
            res.status(httpStatus.noContentDeleted).send(msg);
        });
    }

    public patchNegotiation(req: Request, res: Response): void {
        const negotiationId = req.params.id;
        let msg = `PATCH method for a negotiations with id ${negotiationId}`;
        logger.info(msg); console.log(msg);
        NegotiationModel.findByIdAndUpdate(negotiationId, req.body, (err: Error, updated: any) => {
            if(err) res.status(httpStatus.badRequest).send(err);
            msg = updated ? "Updated sucessfully" : "Negotiation not found";
            res.status(httpStatus.noContentDeleted).send(msg);
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