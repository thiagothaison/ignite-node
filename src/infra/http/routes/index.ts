import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { carRoutes } from "./car.routes";
import { categoryRoutes } from "./category.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use(authRoutes);

router.use("/cars", carRoutes);
router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);

router.use("/users", userRoutes);

export { router };
