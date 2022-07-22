import { Router } from "express";

import * as accountsRoutes from "~/accounts/routes";

import * as carsRoutes from "~/cars/routes";

const router = Router();

router.use("/categories", carsRoutes.categoryRoutes);
router.use("/specifications", carsRoutes.specificationRoutes);

router.use("/users", accountsRoutes.userRoutes);

export { router };
