import { Router } from "express";

import { AuthenticateUserController } from "@application/controllers/auth/authenticate-user";
import { RefreshTokenController } from "@application/controllers/auth/refresh-token";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/auth", authenticateUserController.handle);
authRoutes.post("/auth/refresh", refreshTokenController.handle);

export { authRoutes };
