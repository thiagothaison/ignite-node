import "@config/dotenv";

import { DataSource } from "typeorm";

import dataSourceOptions from "./options";

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
