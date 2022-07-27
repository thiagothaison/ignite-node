import { Column, Entity } from "typeorm";

import BaseEntity from "./base-entity";

@Entity("specifications")
class Specification extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;
}

export { Specification };
