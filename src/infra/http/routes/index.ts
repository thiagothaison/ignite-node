import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { categoryRoutes } from "./category.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use(authRoutes);

router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);

router.use("/users", userRoutes);

export { router };
