import { getSalt, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import BaseEntity from "./base-entity";

@Entity("users")
class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "driver_license" })
  driverLicense: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @Column()
  avatar: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    try {
      getSalt(this.password);
    } catch {
      this.password = hashSync(this.password, process.env.APP_ENV || 8);
    }
  }
}

export { User };
