import { Router } from "express";

import { CreateRentalController } from "@application/controllers/rental/create";
import { FinalizeRentalController } from "@application/controllers/rental/finalize";
import { ListRentalController } from "@application/controllers/rental/list";

import { isAdmin } from "@infra/http/middlewares/is-admin";

const rentalRoutes = Router();

const listRentalController = new ListRentalController();
const createRentalController = new CreateRentalController();
const finalizeRentalController = new FinalizeRentalController();

rentalRoutes.use(isAdmin);
rentalRoutes.get("/", listRentalController.handle);
rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.post("/finalize/:id", finalizeRentalController.handle);

export { rentalRoutes };
