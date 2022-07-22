import { Router } from "express";

import { CreateUserController } from "~/accounts/useCases/User/createUser/CreateUserController";
import { ListUserController } from "~/accounts/useCases/User/listUsers/ListUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", listUserController.handle);

export { userRoutes };
