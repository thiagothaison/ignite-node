import { inject, injectable } from "tsyringe";

import { IRentalRepository } from "@domain/contracts/repositories/rental";
import {
  IListRentalsUseCase,
  Input,
} from "@domain/contracts/use-cases/rental/list";

@injectable()
class ListRentalsUseCase implements IListRentalsUseCase {
  constructor(
    @inject("RentalRepository") private rentalRepository: IRentalRepository
  ) {}

  async execute(filters?: Input) {
    const rentals = this.rentalRepository.list(filters);

    return rentals;
  }
}

export { ListRentalsUseCase };
