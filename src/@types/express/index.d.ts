import { User } from "~/accounts/entities/User";

declare global {
  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: User;
    }
  }
}
