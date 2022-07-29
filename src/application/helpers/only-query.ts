import { Request } from "express";

const parseValue = (value) => {
  if (value === "true" || value === "false") return value === "true";
  if (value !== "" && Number.isNaN(value)) return value * -1 * -1;
  return value;
};

const onlyQuery = (request: Request, only: string[] = []) => {
  const { query: requestQuery } = request;

  return Object.values(only).reduce((accum, item) => {
    accum[item] =
      requestQuery[item] === "undefined"
        ? undefined
        : parseValue(requestQuery[item]);

    return accum;
  }, {});
};

export { onlyQuery };
