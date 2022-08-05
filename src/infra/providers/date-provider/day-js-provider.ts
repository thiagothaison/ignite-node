import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "@domain/contracts/providers/date-provider";

dayjs.extend(utc);

class DayJsProvider implements IDateProvider {
  compare(startDate, endDate, diffType) {
    const endDateUtc = this.toUtc(endDate);
    const startDateUtc = this.toUtc(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, diffType || "hours");
  }

  toUtc(date) {
    return dayjs(date).utc().local().format();
  }

  now() {
    return dayjs().toDate();
  }

  yesterday() {
    return dayjs().subtract(1, "day").toDate();
  }

  tomorrow() {
    return dayjs().add(1, "day").toDate();
  }

  addDays(numberOfDays: number, date?: Date) {
    const baseDay = dayjs(date);

    if (numberOfDays > 0) {
      return baseDay.add(numberOfDays, "days").toDate();
    }

    return baseDay.subtract(numberOfDays, "days").toDate();
  }
}

export { DayJsProvider };
