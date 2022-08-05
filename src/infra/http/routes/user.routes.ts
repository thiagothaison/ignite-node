import { Router } from "express";
import multer from "multer";

import UploadConfig from "@config/upload";

import { CreateUserController } from "@application/controllers/user/create";
import { ListUserController } from "@application/controllers/user/list";
import { UpdateUserAvatarController } from "@application/controllers/user/update-avatar";

import { isAdmin } from "@infra/http/middlewares/is-admin";

const userRoutes = Router();

const upload = multer(UploadConfig.upload("avatars"));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.get("/", listUserController.handle);

userRoutes.use(isAdmin);
userRoutes.post("/", createUserController.handle);
userRoutes.patch(
  "/update-avatar",
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
