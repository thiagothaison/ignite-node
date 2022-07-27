import { CreateSpecification } from "@domain/contracts/dtos/specification/create-specification";
import { ListSpecifications } from "@domain/contracts/dtos/specification/list-specifications";

import { Specification } from "@infra/typeorm/entities/specification";

interface ISpecificationRepository {
  create(parameters: CreateSpecification.Input): CreateSpecification.Output;
  list(): ListSpecifications.Output;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository };
