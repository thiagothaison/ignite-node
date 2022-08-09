import { container } from "tsyringe";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IMailProvider } from "@domain/contracts/providers/mail";
import { IStorageProvider } from "@domain/contracts/providers/storage";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";
import { EtherealProvider } from "@infra/providers/mail/ethereal";
import { LocalStorageProvider } from "@infra/providers/storage/local";
import { S3StorageProvider } from "@infra/providers/storage/s3";

container.registerSingleton<IDateProvider>("DateProvider", DayJsProvider);
container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealProvider()
);

container.registerInstance<IStorageProvider>(
  "StorageProvider",
  process.env.NODE_ENV === "production"
    ? new S3StorageProvider()
    : new LocalStorageProvider()
);
