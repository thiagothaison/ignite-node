import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

import { Specification } from "@infra/typeorm/entities/specification";

type Input = void;

type Output = Promise<Specification[]>;

type IListSpecificationsUseCase = IBaseUseCase<Input, Output>;

export { IListSpecificationsUseCase, Input };
