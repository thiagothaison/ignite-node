import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IMailProvider } from "@domain/contracts/providers/mail";
import { IUserRepository } from "@domain/contracts/repositories/user";
import { IUserTokenRepository } from "@domain/contracts/repositories/user-token";
import { ISendRecoveryEmailUseCase } from "@domain/contracts/use-cases/auth/send-recovery-email";
import { AppError } from "@domain/errors/app-error";

import { Type } from "@infra/typeorm/entities/user-token";

@injectable()
class SendRecoveryEmailUseCase implements ISendRecoveryEmailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({ email, baseUrl }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuidV4();
    const expiresAt = this.dateProvider.addHours(3);

    await this.userTokenRepository.create({
      userId: user.id,
      token,
      expiresAt,
      type: Type.RECOVERY,
    });

    await this.mailProvider.send(
      email,
      "Recuperação de senha",
      "forgot-password",
      {
        name: user.name,
        link: `${baseUrl}/auth/reset-password?token=${token}`,
      }
    );
  }
}

export { SendRecoveryEmailUseCase };
