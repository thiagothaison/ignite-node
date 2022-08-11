import "@config/dotenv";
import path from "path";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

const dataSourceProductionOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  logging: process.env.DB_LOGGING === "true",
  migrations: [path.join(__dirname, "../migrations/*.{js,ts}")],
  entities: [path.join(__dirname, "../entities/*.{js,ts}")],
  seeds: [path.join(__dirname, "../seeds/*.seeder.{js,ts}")],
  factories: [path.join(__dirname, "../factories/*.factory.{js,ts}")],
};

const dataSourceTestOptions = {
  ...dataSourceProductionOptions,
  database: `${dataSourceProductionOptions.database}_test`,
  logging: false,
  dropSchema: true,
};

export default process.env.NODE_ENV === "test"
  ? dataSourceTestOptions
  : dataSourceProductionOptions;
