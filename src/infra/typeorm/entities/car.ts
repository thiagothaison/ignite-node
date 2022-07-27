import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Category } from "@infra/typeorm/entities/category";

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
}

export { Car };
