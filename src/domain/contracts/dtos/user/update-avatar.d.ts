import { User } from "@infra/typeorm/entities/user";

export namespace UpdateAvatar {
  export type Input = {
    user: User;
    avatar: string;
  };

  export type Output = Promise<void>;
}
