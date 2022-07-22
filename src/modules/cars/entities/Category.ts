import { Column, Entity } from "typeorm";

import BaseEntity from "~/common/entities";

@Entity("categories")
class Category extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;
}

export { Category };
