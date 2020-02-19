import { Application } from "express";
import { Service } from "./service";

export class Controller {
    private service: Service;
  
    constructor(private app: Application) {
      this.service = new Service();
      this.configRoutes();
    }
  
    public configRoutes() {
      this.app.route("/").get(this.service.renderWelcomeMessage);
      this.app.route("/negotiations").get(this.service.getAllNegotiations);
      this.app.route("/negotiation").post(this.service.addNewNegotiation);
      this.app
        .route("/negotiation/:id")
        .put(this.service.updateNegotiation)
        .delete(this.service.deleteNegotiation);
    }
}
