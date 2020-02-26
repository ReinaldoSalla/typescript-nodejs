import express, { Application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Controller } from "./controller";
import { dbUrl } from "./properties";

class App {
    public app: Application;
    public controller: Controller;

    constructor() {
        this.app = express();
        this.configMiddlewares();
        this.configMongo();
        this.controller = new Controller(this.app)
    }

    private configMiddlewares(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    private configMongo(): void {
        const db = mongoose.connection;
        mongoose.set('useFindAndModify', false); // Set to false to remove a DeprecationWarning message when using findByIdAndUpdate in service.ts
        mongoose.connect(dbUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        db.on("error", console.error.bind(console, "Connection error with MongoDB"));
        console.log(`MongoDB connected. URL: ${dbUrl}`);
    }
}

export default new App().app;