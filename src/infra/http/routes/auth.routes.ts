import { Router } from "express";

import { AuthenticateUserController } from "@application/controllers/auth/authenticate-user";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/auth", authenticateUserController.handle);

export { authRoutes };
