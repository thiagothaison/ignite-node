import { v4 as uuidV4 } from "uuid";

import {
  IUserTokenRepository,
  CreateParameters,
} from "@domain/contracts/repositories/user-token";

import { UserToken } from "@infra/typeorm/entities/user-token";

class UserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[];

  constructor() {
    this.userTokens = [];
  }

  async create(data: CreateParameters) {
    const userToken = new UserToken();

    Object.assign(userToken, {
      ...data,
      id: uuidV4(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token, type) {
    return this.userTokens.find(
      (userToken) => userToken.token === token && userToken.type === type
    );
  }

  async deleteById(id) {
    this.userTokens.map((userToken) => userToken.id !== id);
  }
}

export { UserTokenRepository };
