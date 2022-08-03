import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { User } from "@infra/typeorm/entities/user";

type Input = {
  user: User;
  avatar: string;
};

type Output = Promise<void>;

type IUpdateUserAvatarUseCase = IBaseUseCase<Input, Output>;

export { IUpdateUserAvatarUseCase, Input };
