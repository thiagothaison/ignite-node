import { v4 as uuidV4 } from "uuid";

import { IRentalRepository } from "@domain/contracts/repositories/rental";

import { Rental } from "@infra/typeorm/entities/rental";

class RentalRepository implements IRentalRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async create(parameters) {
    const rental = new Rental();

    Object.assign(rental, { ...parameters, id: uuidV4() });

    this.rentals.push(rental);

    return rental;
  }

  async list(filters) {
    return this.rentals.filter((rental) => {
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
}

export { RentalRepository };
