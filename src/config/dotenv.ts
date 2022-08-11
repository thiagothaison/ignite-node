import "reflect-metadata";

import dotenv from "dotenv";

dotenv.config({
  path:
    !process.env.NODE_ENV || process.env.NODE_ENV !== "production"
      ? ".env"
      : ".env.production",
});
