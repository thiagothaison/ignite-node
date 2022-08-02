interface IDateProvider {
  compare(
    startDate: Date,
    endDate: Date,
    diffType?:
      | "milliseconds"
      | "seconds"
      | "minutes"
      | "hours"
      | "days"
      | "months"
      | "years"
  ): number;
  toUtc(date: Date): string;
  now(): Date;
  yesterday(): Date;
  tomorrow(): Date;
}

export { IDateProvider };