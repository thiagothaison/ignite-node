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

  async update(car) {
    await this.repository.save(car);
  }

  async list(filters) {
    const cars = await this.repository.find({ where: filters });

    return cars;
  }

  async findByLicensePlate(licensePlate) {
    const car = await this.repository.findOne({ where: { licensePlate } });

    return car;
  }

  async findById(id) {
    const car = await this.repository.findOne({ where: { id } });

    return car;
  }
}

export { CarRepository };
