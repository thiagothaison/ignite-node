import { Router } from "express";
import multer from "multer";

import Upload from "@config/upload";

import { CreateUserController } from "@application/controllers/user/create";
import { ListUserController } from "@application/controllers/user/list";
import { ProfileController } from "@application/controllers/user/profile";
import { UpdateUserAvatarController } from "@application/controllers/user/update-avatar";

import { isAdmin } from "@infra/http/middlewares/is-admin";

import { singleUpload } from "../middlewares/single-upload";

const userRoutes = Router();

const upload = multer(Upload.getConfig("avatars"));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const profileController = new ProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.get("/", listUserController.handle);
userRoutes.get("/profile", profileController.handle);

userRoutes.use(isAdmin);
userRoutes.post("/", createUserController.handle);
userRoutes.patch(
  "/update-avatar",
  upload.single("avatar"),
  singleUpload,
  updateUserAvatarController.handle
);

export { userRoutes };
