import { User } from "@infra/typeorm/entities/user";

interface IUserRepository {
  create(parameters: ICreateUser): Promise<void>;
  update(user: User): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
