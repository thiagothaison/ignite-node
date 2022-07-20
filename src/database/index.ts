import { DataSource } from "typeorm";

import { configuration } from "~/root/ormconfig";

const AppDataSource = new DataSource(configuration);

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
