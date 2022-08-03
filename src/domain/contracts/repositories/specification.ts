import { Specification } from "@infra/typeorm/entities/specification";

type CreateParameters = {
  name: string;
  description: string;
};

interface ISpecificationRepository {
  create(data: CreateParameters): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findById(id: string): Promise<Specification>;
}

export { CreateParameters, ISpecificationRepository };
