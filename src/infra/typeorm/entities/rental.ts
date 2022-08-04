import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import BaseEntity from "./base-entity";
import { Car } from "./car";

@Entity("rentals")
class Rental extends BaseEntity {
  @Column({ name: "car_id" })
  carId: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "start_at" })
  startAt: Date;

  @Column({ name: "end_at" })
  endAt: Date;

  @Column({ name: "expected_end_at" })
  expectedEndAt: Date;

  @Column()
  total: number;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car?: Car;
}

export { Rental };
