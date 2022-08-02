import { container } from "tsyringe";

import { IDateProvider } from "@domain/contracts/providers/date-provider";

import { DayJsProvider } from "@infra/providers/date-provider/day-js-provider";

container.registerSingleton<IDateProvider>("DateProvider", DayJsProvider);
