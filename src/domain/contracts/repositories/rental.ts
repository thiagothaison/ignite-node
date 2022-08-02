import { CreateRental } from "@domain/contracts/dtos/rental/create";
import { ListRentals } from "@domain/contracts/dtos/rental/list";

import { Rental } from "@infra/typeorm/entities/rental";

interface IRentalRepository {
  create(parameters: CreateRental.Input): CreateRental.Output;
  list(filters: ListRentals.Input): ListRentals.Output;
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(carId: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
}

export { IRentalRepository };
