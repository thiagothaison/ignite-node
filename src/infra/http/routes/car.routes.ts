import { Router } from "express";

import { CreateCarController } from "@application/controllers/car/create-car";
import { ListCarsController } from "@application/controllers/car/list-cars";

import { isAdmin } from "@infra/http/middlewares/is-admin";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carRoutes.get("/", listCarsController.handle);

carRoutes.use(isAdmin);
carRoutes.post("/", createCarController.handle);

export { carRoutes };
