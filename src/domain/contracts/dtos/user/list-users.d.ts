import { User } from "@infra/typeorm/entities/user";

export namespace ListUsers {
  export type Output = Promise<User[]>;
}
