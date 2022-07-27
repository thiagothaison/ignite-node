import { CreateUser } from "@domain/contracts/dtos/user/create-user";
import { ListUsers } from "@domain/contracts/dtos/user/list-users";
import { UpdateUser } from "@domain/contracts/dtos/user/update-user";

import { User } from "@infra/typeorm/entities/user";

interface IUserRepository {
  create(parameters: CreateUser.Input): CreateUser.Output;
  update(user: UpdateUser.Input): UpdateUser.Output;
  list(): ListUsers.Output;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
