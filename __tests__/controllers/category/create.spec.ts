import request from "supertest";
import { runSeeder } from "typeorm-extension";

import { app } from "@infra/http/app";
import AppDataSource from "@infra/typeorm";
import CreateAdminUserSeeder from "@infra/typeorm/seeds/create-admin-user.seeder";

describe("Create category controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    await runSeeder(AppDataSource, CreateAdminUserSeeder);
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
  });

  const getToken = async () => {
    const {
      body: { token },
    } = await request(app).post("/auth").send({
      email: CreateAdminUserSeeder.email,
      password: CreateAdminUserSeeder.password,
    });

    return token;
  };

  it("Should be able to create a new category", async () => {
    const token = await getToken();

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Supertest",
        description: "Supertest description",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a existent category", async () => {
    const token = await getToken();

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Supertest",
        description: "Supertest description",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(409);
  });
});
