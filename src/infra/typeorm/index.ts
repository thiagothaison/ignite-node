import "@config/dotenv";

import dataSourceOptions from "@dataSourceOptions";

import { DataSource } from "typeorm";

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(async () => {
    console.log(
      `🔥 Successfully connected with database ${dataSourceOptions.database}`
    );
  })
  .catch((err) => {
    console.error(
      "⛔ An error occurred while trying to connect to the database",
      err
    );
  });

export default AppDataSource;
