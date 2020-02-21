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
      this.app.route("/negotiation/:id").get(this.service.getOneNegotiation);
      this.app.route("/negotiations").get(this.service.getAllNegotiations);
      this.app.route("/negotiation").post(this.service.postNewNegotiation);
      this.app.route("/negotiationWithDate").post(this.service.postNewNegotiationWithDate);
      this.app.route("/negotiation/:id").put(this.service.putNegotiation);
      this.app.route("/negotiation/:id").patch(this.service.patchNegotiation);
      this.app.route("/negotiation/:id").delete(this.service.deleteNegotiation);
    }
}
