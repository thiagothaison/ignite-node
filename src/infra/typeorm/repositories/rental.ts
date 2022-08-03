import { inject, injectable } from "tsyringe";
import { DataSource, IsNull, Repository } from "typeorm";

import {
  CreateParameters,
  IRentalRepository,
  ListFilters,
} from "@domain/contracts/repositories/rental";

import { Rental } from "@infra/typeorm/entities/rental";

@injectable()
class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Rental);
  }

  async create(data: CreateParameters) {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async list(filters: ListFilters) {
    const rentals = await this.repository.find({ where: filters });

    return rentals;
  }

  async findById(id) {
    const rental = await this.repository.findOne({ where: { id } });

    return rental;
  }

  async findOpenRentalByCar(carId) {
    const rentalAlreadyExists = await this.repository.findOne({
      where: {
        carId,
        endAt: IsNull(),
      },
    });

    return rentalAlreadyExists;
  }

  async findOpenRentalByUser(userId) {
    const rentalAlreadyExists = await this.repository.findOne({
      where: {
        userId,
        endAt: IsNull(),
      },
    });

    return rentalAlreadyExists;
  }
}

export { RentalRepository };
