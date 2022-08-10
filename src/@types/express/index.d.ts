import { User } from "@infra/typeorm/entities/user";

declare global {
  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: User;
    }
  }

  declare namespace Express.Multer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface File {
      key?: string;
      location?: string;
    }
  }
}
