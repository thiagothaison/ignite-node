import { Column, Entity } from "typeorm";

import BaseEntity from "./base-entity";

@Entity("car_images")
class CarImage extends BaseEntity {
  @Column({ name: "car_id" })
  carId: string;

  @Column()
  image: string;
}

export { CarImage };
