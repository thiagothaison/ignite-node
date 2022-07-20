import { ConnectionOptions } from "typeorm";

const configuration: ConnectionOptions = {
  name: "default",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  type: process.env.DB_CONNECTION || "postgress",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "test",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  logging: !!process.env.DB_LOGGING || false,
};

export { configuration };
