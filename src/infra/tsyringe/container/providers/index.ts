import { container } from "tsyringe";

import { IDateProvider } from "@domain/contracts/providers/date-provider";
import { IMailProvider } from "@domain/contracts/providers/mail";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";
import { EtherealProvider } from "@infra/providers/mail/ethereal";

container.registerSingleton<IDateProvider>("DateProvider", DayJsProvider);
container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealProvider()
);
