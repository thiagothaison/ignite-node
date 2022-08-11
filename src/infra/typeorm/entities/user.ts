import { getSalt, hashSync } from "bcryptjs";
import { Expose } from "class-transformer";
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

  @Expose()
  avatarUrl(): string {
    if (process.env.NODE_ENV === "production") {
      return `${process.env.AWS_BUCKET_URL}/avatars/${this.avatar}`;
    }

    return `/static/avatars/${this.avatar}`;
  }

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
