import { Router } from "express";

import { ensureAuthenticated } from "~/middlewares/ensureAuthenticated";

import { CreateUserController } from "~/accounts/useCases/User/createUser/CreateUserController";
import { ListUserController } from "~/accounts/useCases/User/listUsers/ListUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

userRoutes.use(ensureAuthenticated);
userRoutes.post("/", createUserController.handle);
userRoutes.get("/", listUserController.handle);

export { userRoutes };
