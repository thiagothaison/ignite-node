import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { User } from "@infra/typeorm/entities/user";

type Input = void;

type Output = Promise<User[]>;

type IListUserUseCase = IBaseUseCase<Input, Output>;

export { IListUserUseCase, Input };
