import { IBaseUseCase } from "@domain/contracts/use-cases/base-use-case";

type Input = {
  refreshToken: string;
};

type Output = Promise<{
  token: string;
  refreshToken: string;
}>;

type IRefreshTokenUseCase = IBaseUseCase<Input, Output>;

export { IRefreshTokenUseCase, Input };
