import "reflect-metadata";
import "../config/dotenv";

import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  logging: !!process.env.DB_LOGGING || false,
  migrations: ["src/database/migrations/*.ts"],
  entities: [
    "src/modules/cars/entities/*.ts",
    "src/modules/common/entities/*.ts",
  ],
});

AppDataSource.initialize()
  .then(() => {
    console.log("🔥 Successfully connected with database");
  })
  .catch((err) => {
    console.error(
      "⛔ An error occurred while trying to connect to the database",
      err
    );
  });

export default AppDataSource;
