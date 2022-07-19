import { Router } from "express";

import * as routes from "~/cars/routes";

const router = Router();

router.use("/categories", routes.categoryRoutes);
router.use("/specifications", routes.specificationRoutes);

export { router };
