import { Router } from "express";

import { AddSpecificationController } from "@application/controllers/car/add-specification";
import { CreateCarController } from "@application/controllers/car/create-car";
import { ListCarsController } from "@application/controllers/car/list-cars";

import { isAdmin } from "@infra/http/middlewares/is-admin";

import { carImageRoutes } from "./car-image.routes";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const addSpecificationController = new AddSpecificationController();

carRoutes.get("/", listCarsController.handle);

carRoutes.use(isAdmin);
carRoutes.use("/images", carImageRoutes);

carRoutes.post("/", createCarController.handle);
carRoutes.post("/specification/:carId", addSpecificationController.handle);

export { carRoutes };
