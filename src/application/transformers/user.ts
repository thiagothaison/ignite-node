import { instanceToInstance } from "class-transformer";

import { UserTransformer } from "@domain/contracts/transformers/user";

import { User } from "@infra/typeorm/entities/user";

class UserMap {
  static transform({
    id,
    name,
    email,
    driverLicense,
    avatarUrl,
  }: User): UserTransformer {
    const user = instanceToInstance({
      id,
      name,
      email,
      driverLicense,
      avatarUrl,
    });

    return user;
  }
}

export { UserMap };
