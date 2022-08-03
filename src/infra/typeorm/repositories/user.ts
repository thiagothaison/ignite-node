import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import {
  CreateParameters,
  IUserRepository,
  UpdateParameters,
} from "@domain/contracts/repositories/user";

import { User } from "@infra/typeorm/entities/user";

@injectable()
class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async create(data: CreateParameters) {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  async update(data: UpdateParameters) {
    const { id, ...fields } = data;

    await this.repository.update({ id }, fields);

    const user = await this.findById(id);

    return user;
  }

  async list() {
    const users = await this.repository.find();

    return users;
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id) {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}

export { UserRepository };
