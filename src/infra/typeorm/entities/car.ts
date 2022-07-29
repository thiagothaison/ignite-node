import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { Category } from "@infra/typeorm/entities/category";
import { Specification } from "@infra/typeorm/entities/specification";

import BaseEntity from "./base-entity";

@Entity("cars")
class Car extends BaseEntity {
  @Column({ name: "category_id" })
  categoryId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "daily_rate" })
  dailyRate: number;

  @Column({ default: true })
  available: boolean;

  @Column({ name: "license_plate" })
  licensePlate: string;

  @Column({ name: "fine_amount" })
  fineAmount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumn: { name: "car_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "specification_id" },
  })
  specifications?: Specification[];
}

export { Car };
