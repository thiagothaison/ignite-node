import { Car } from "@infra/typeorm/entities/car";
import { Specification } from "@infra/typeorm/entities/specification";

type CreateParameters = {
  categoryId: string;
  name: string;
  description: string;
  dailyRate: number;
  available?: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
};

type UpdateParameters = CreateParameters & {
  id: string;
  specifications?: Specification[];
};

type ListFilters = {
  categoryId?: string;
  brand?: string;
  name?: string;
  available?: boolean;
};

interface ICarRepository {
  create(data: CreateParameters): Promise<Car>;

  update(data: UpdateParameters): Promise<void>;

  list(filters?: ListFilters): Promise<Car[]>;

  findByLicensePlate(licensePlate: string): Promise<Car>;

  findById(id: string): Promise<Car>;

  changeAvailability(id: string, available: boolean): Promise<Car>;
}

export { ICarRepository, CreateParameters, UpdateParameters, ListFilters };
