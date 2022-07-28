import "./src/application/config/dotenv";

import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  logging: !!process.env.DB_LOGGING || false,
  migrations: ["src/infra/typeorm/migrations/*.ts"],
  entities: ["src/infra/typeorm/entities/*.ts"],
  seeds: ["src/infra/typeorm/seeds/*.seeder.ts"],
  factories: ["src/infra/typeorm/factories/*.factory.ts"],
};

export default dataSourceOptions;
