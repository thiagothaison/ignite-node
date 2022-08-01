import { CreateCarImage } from "@domain/contracts/dtos/car-image/create-car-image";

interface ICarImageRepository {
  create(parameters: CreateCarImage.Input): CreateCarImage.Output;
}

export { ICarImageRepository };
