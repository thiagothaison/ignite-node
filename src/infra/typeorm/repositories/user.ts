import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { IUserRepository } from "@domain/contracts/repositories/user";

import { User } from "@infra/typeorm/entities/user";

@injectable()
class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async create(fields) {
    const user = this.repository.create(fields);

    await this.repository.save(user);
  }

  async update(user) {
    const { id, ...fields } = user;

    await this.repository.update({ id }, fields);
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
