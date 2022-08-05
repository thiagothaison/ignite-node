import { UserToken, Type } from "@infra/typeorm/entities/user-token";

type CreateParameters = {
  userId: string;
  token: string;
  expiresAt: Date;
  type: Type
};

interface IUserTokenRepository {
  create(data: CreateParameters): Promise<UserToken>;
  findByToken(token: string, type: Type): Promise<UserToken>;
}

export { IUserTokenRepository, CreateParameters };
