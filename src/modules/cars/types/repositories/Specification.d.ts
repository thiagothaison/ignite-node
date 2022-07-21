import { Specification } from "~/root/src/modules/cars/entities/Specification";

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository };
