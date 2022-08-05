import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import {
  CreateParameters,
  IUserTokenRepository,
} from "@domain/contracts/repositories/user-token";

import { Type, UserToken } from "@infra/typeorm/entities/user-token";

@injectable()
class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserToken);
  }

  async create(data: CreateParameters) {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }

  async findByToken(token: string, type: Type) {
    const userToken = await this.repository.findOne({
      where: { token, type },
      relations: ["user"],
    });

    return userToken;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }
}

export { UserTokenRepository };
