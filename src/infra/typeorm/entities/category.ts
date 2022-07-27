import { Column, Entity } from "typeorm";

import BaseEntity from "./base-entity";

@Entity("categories")
class Category extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;
}

export { Category };
