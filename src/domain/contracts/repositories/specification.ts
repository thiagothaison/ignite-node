import { Specification } from "@infra/typeorm/entities/specification";

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecification): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository };
