import { hashSync } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import {
  CreateParameters,
  IUserRepository,
  UpdateParameters,
} from "@domain/contracts/repositories/user";

import { User } from "@infra/typeorm/entities/user";

class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create(data: CreateParameters) {
    const user = new User();

    Object.assign(user, {
      ...data,
      id: uuidV4(),
      password: hashSync(data.password, process.env.APP_ENV || 8),
    });

    this.users.push(user);

    return user;
  }

  async update(data: UpdateParameters) {
    this.users = this.users.map((currentUser) =>
      currentUser.id === data.id ? currentUser : (data as User)
    );

    const user = await this.findById(data.id);

    return user;
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
