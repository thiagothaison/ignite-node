import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { User } from "@infra/typeorm/entities/user";

export default class CreateAdminUserSeeder implements Seeder {
  static email = "jon.doe@domain.com";
  static password = "159258";

  public async run(dataSource: DataSource): Promise<void> {
    console.info("Seeding admin user");

    const repository = dataSource.getRepository(User);
    const user = repository.create({
      name: "Thiago Admin",
      email: CreateAdminUserSeeder.email,
      password: CreateAdminUserSeeder.password,
      driverLicense: "0000000784",
      isAdmin: true,
    });

    await repository.insert(user);
  }
}
