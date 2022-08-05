import { Router } from "express";

import { AuthenticateUserController } from "@application/controllers/auth/authenticate-user";
import { RefreshTokenController } from "@application/controllers/auth/refresh-token";
import { SendRecoveryEmailController } from "@application/controllers/auth/send-recovery-email";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendRecoveryEmailController = new SendRecoveryEmailController();

authRoutes.post("/auth", authenticateUserController.handle);
authRoutes.post("/auth/refresh", refreshTokenController.handle);
authRoutes.post("/auth/recovery", sendRecoveryEmailController.handle);

export { authRoutes };
