import { Router } from "express";

import { CreateRentalController } from "@application/controllers/rental/create";
import { ListRentalController } from "@application/controllers/rental/list";

import { isAdmin } from "@infra/http/middlewares/is-admin";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const listRentalController = new ListRentalController();

rentalRoutes.use(isAdmin);
rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.get("/", listRentalController.handle);

export { rentalRoutes };
