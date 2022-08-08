import { v4 as uuidV4 } from "uuid";

import {
  CreateParameters,
  ICarImageRepository,
} from "@domain/contracts/repositories/car-image";

import { CarImage } from "@infra/typeorm/entities/car-image";

class CarImageRepository implements ICarImageRepository {
  private carImages: CarImage[];

  constructor() {
    this.carImages = [];
  }

  async create(data: CreateParameters) {
    const carImage = new CarImage();

    Object.assign(carImage, {
      ...data,
      id: uuidV4(),
    });

    this.carImages.push(carImage);
  }
}

export { CarImageRepository };
