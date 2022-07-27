import { hashSync } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { IUserRepository } from "@domain/contracts/repositories/user";

import { User } from "@infra/typeorm/entities/user";

class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create(parameters) {
    const user = new User();

    Object.assign(user, {
      ...parameters,
      id: uuidV4(),
      password: hashSync(parameters.password, process.env.APP_ENV || 8),
    });

    this.users.push(user);
  }

  async update(user) {
    this.users = this.users.map((currentUser) =>
      currentUser.id === user.id ? currentUser : user
    );
  }

  async list() {
    return this.users;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async findById(id) {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepository };
