import { Specification } from "~/cars/models/Specification";

interface ISpecificationRepository {
  findByName(name: string): Specification;
  list(): Specification[];
  create({ name, description }: ICreateSpecificationDTO): void;
}

export { ISpecificationRepository };
