import { User } from "~/accounts/entities/User";

interface IUserRepository {
  create(parameters: ICreateUserDTO): Promise<void>;
  update(user: User): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
