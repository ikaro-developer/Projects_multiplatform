import express, { response } from "express";
import PointsController from "./controllers/PointsController.js";
import ItemsController from "./controllers/ItemsController.js";

const routes = express.Router();

//CONTROLLERS
const pointsController = new PointsController();
const itemsController = new ItemsController();

//ROUTES
routes.get("/items", itemsController.index);

routes.post("/points", pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;
