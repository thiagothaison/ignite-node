import { Rental } from "@infra/typeorm/entities/rental";

type CreateParameters = {
  carId: string;
  userId: string;
  startAt?: Date;
  endAt?: Date;
  expectedEndAt: Date;
  total?: number;
};

type ListFilters = {
  carId?: string;
  userId?: string;
  startAt?: Date;
  endAt?: Date;
  expectedEndAt?: Date;
};

interface IRentalRepository {
  create(data: CreateParameters): Promise<Rental>;
  list(filters: ListFilters): Promise<Rental[]>;
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(carId: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
}

export { CreateParameters, IRentalRepository, ListFilters };
