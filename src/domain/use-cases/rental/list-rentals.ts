import { inject, injectable } from "tsyringe";

import { ListRentals } from "@domain/contracts/dtos/rental/list";
import { IRentalRepository } from "@domain/contracts/repositories/rental";

@injectable()
class ListRentalsUseCase {
  constructor(
    @inject("RentalRepository") private rentalRepository: IRentalRepository
  ) {}

  async execute(filters?: ListRentals.Input): ListRentals.Output {
    const rentals = this.rentalRepository.list(filters);

    return rentals;
  }
}

export { ListRentalsUseCase };
