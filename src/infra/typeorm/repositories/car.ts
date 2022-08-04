import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import {
  CreateParameters,
  ICarRepository,
  ListFilters,
  UpdateParameters,
} from "@domain/contracts/repositories/car";

import { Car } from "@infra/typeorm/entities/car";

@injectable()
class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Car);
  }

  async create(data: CreateParameters) {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  async update(data: UpdateParameters) {
    await this.repository.save(data);
  }

  async list(filters: ListFilters) {
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

  async changeAvailability(id, available = true) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();

    const car = await this.findById(id);

    return car;
  }
}

export { CarRepository };
