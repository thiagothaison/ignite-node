import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import BaseEntity from "./base-entity";
import { User } from "./user";

export enum Type {
  REFRESH = "refresh",
  RECOVERY = "recovery",
}

@Entity("users_tokens")
class UserToken extends BaseEntity {
  @Column({ name: "user_id" })
  userId: string;

  @Column({ type: "enum", enum: Type })
  type: string;

  @Column()
  token: string;

  @Column({ name: "expires_at" })
  expiresAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;
}

export { UserToken };
