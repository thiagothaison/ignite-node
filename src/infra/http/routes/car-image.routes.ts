import { Router } from "express";
import multer from "multer";

import UploadConfig from "@application/config/upload";
import { CreateCarImageController } from "@application/controllers/car-image/create-car-images";

const carImageRoutes = Router();
const upload = multer(UploadConfig.upload("cars"));

const createCarImageController = new CreateCarImageController();

carImageRoutes.post(
  "/:carId",
  upload.array("images"),
  createCarImageController.handle
);

export { carImageRoutes };
