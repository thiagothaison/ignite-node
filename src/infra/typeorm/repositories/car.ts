import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { ICarRepository } from "@domain/contracts/repositories/car";

import { Car } from "@infra/typeorm/entities/car";

@injectable()
class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Car);
  }

  async create(parameters) {
    const car = this.repository.create(parameters);

    await this.repository.save(car);
  }

  async list() {
    const cars = await this.repository.find();

    return cars;
  }

  async findByLicensePlate(licensePlate) {
    const car = await this.repository.findOne({ where: { licensePlate } });

    return car;
  }
}

export { CarRepository };
