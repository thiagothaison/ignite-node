import { Router } from "express";
import multer from "multer";

import UploadConfig from "@application/config/upload";
import { CreateUserController } from "@application/controllers/user/create-user";
import { ListUserController } from "@application/controllers/user/list-users";
import { UpdateUserAvatarController } from "@application/controllers/user/update-avatar";

import { ensureAuthenticated } from "@infra/http/middlewares/ensure-authenticated";

const userRoutes = Router();

const upload = multer(UploadConfig.upload("avatars"));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.use(ensureAuthenticated);
userRoutes.get("/", listUserController.handle);
userRoutes.patch(
  "/update-avatar",
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
