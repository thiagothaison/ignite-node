import { User } from "~/accounts/entities/User";

interface IUserRepository {
  create(parameters: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
