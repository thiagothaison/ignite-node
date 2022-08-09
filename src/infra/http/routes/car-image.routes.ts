import { Router } from "express";
import multer from "multer";

import Upload from "@config/upload";

import { CreateCarImageController } from "@application/controllers/car-image/create";

const upload = multer(Upload.getConfig("cars"));
const carImageRoutes = Router();

const createCarImageController = new CreateCarImageController();

carImageRoutes.post(
  "/:carId",
  upload.array("images"),
  createCarImageController.handle
);

export { carImageRoutes };
