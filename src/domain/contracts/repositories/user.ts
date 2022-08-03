import { User } from "@infra/typeorm/entities/user";

type CreateParameters = {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  isAdmin: boolean;
};

type UpdateParameters = CreateParameters & {
  id: string;
  avatar?: string;
};

interface IUserRepository {
  create(data: CreateParameters): Promise<User>;
  update(data: UpdateParameters): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { CreateParameters, IUserRepository, UpdateParameters };
