import UploadConfig from "~/config/upload";

import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "~/middlewares/ensureAuthenticated";

import { CreateUserController } from "~/accounts/useCases/User/createUser/CreateUserController";
import { ListUserController } from "~/accounts/useCases/User/listUsers/ListUserController";
import { UpdateUserAvatarController } from "~/accounts/useCases/User/updateUserAvatar/UpdateUserAvatarController";

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
