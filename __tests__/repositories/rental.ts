import { v4 as uuidV4 } from "uuid";

import {
  CreateParameters,
  FinalizeParameters,
  IRentalRepository,
  ListFilters,
} from "@domain/contracts/repositories/rental";

import { Rental } from "@infra/typeorm/entities/rental";

class RentalRepository implements IRentalRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async create(data: CreateParameters) {
    const rental = new Rental();

    Object.assign(rental, { id: uuidV4(), ...data });

    this.rentals.push(rental);

    return rental;
  }

  async list(filters: ListFilters) {
    return this.rentals.filter((rental) => {
      if (!filters) return true;

      let passed = true;

      Object.keys(filters).forEach((key) => {
        if (rental[key] !== filters[key]) {
          passed = false;
        }
      });

      return passed;
    });
  }

  async findById(id) {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findOpenRentalByCar(carId) {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endAt
    );
  }

  async findOpenRentalByUser(userId) {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endAt
    );
  }

  async finalize({ id, endAt, total }: FinalizeParameters) {
    const rental = await this.findById(id);
    rental.endAt = endAt;
    rental.total = total;

    this.rentals = this.rentals.map((currentRental) =>
      currentRental.id === id ? rental : currentRental
    );

    return rental;
  }
}

export { RentalRepository };
