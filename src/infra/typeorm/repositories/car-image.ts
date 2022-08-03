import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import {
  CreateParameters,
  ICarImageRepository,
} from "@domain/contracts/repositories/car-image";

import { CarImage } from "@infra/typeorm/entities/car-image";

@injectable()
class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(CarImage);
  }

  async create(data: CreateParameters) {
    const carImage = this.repository.create(data);

    await this.repository.save(carImage);
  }
}

export { CarImageRepository };
