import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarImageUseCase } from "@domain/use-cases/car-image/create-car-images";

class CreateCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId } = request.params;
    const images = (request.files as Express.Multer.File[]).map(
      (file) => file.filename
    );

    const uploadImageUseCase = container.resolve(CreateCarImageUseCase);

    await uploadImageUseCase.execute({ carId, images });

    return response.status(201).send();
  }
}

export { CreateCarImageController };
