import { Specification } from "@infra/typeorm/entities/specification";

export namespace ListSpecifications {
  export type Output = Promise<Specification[]>;
}
