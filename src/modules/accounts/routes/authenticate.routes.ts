import { Router } from "express";

import { AuthenticateUserController } from "~/accounts/useCases/User/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
