import { Router } from "express";

import { CreateCarController } from "@application/controllers/car/create-car";
import { ListCarsController } from "@application/controllers/car/list-cars";

import { ensureAuthenticated } from "@infra/http/middlewares/ensure-authenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carRoutes.use(ensureAuthenticated);
carRoutes.get("/", listCarsController.handle);
carRoutes.post("/", createCarController.handle);

export { carRoutes };
