import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { User } from "@infra/typeorm/entities/user";

export default class CreateAdminUserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    console.info("Seeding admin user");

    const repository = dataSource.getRepository(User);
    const user = repository.create({
      name: "Thiago Admin",
      email: "thiago.thaison@gmail.com",
      password: "159258",
      driverLicense: "0000000784",
      isAdmin: true,
    });

    await repository.insert(user);
  }
}
