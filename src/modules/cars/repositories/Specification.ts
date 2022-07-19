import { Specification } from "~/cars/models/Specification";
import { ISpecificationRepository } from "~/cars/types/repositories/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  public create({ description, name }: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  public list() {
    return this.specifications;
  }

  public findByName(name: string) {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationRepository };
