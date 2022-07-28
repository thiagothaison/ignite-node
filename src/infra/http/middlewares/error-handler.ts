import { NextFunction, Request, Response } from "express";

import { AppError } from "@domain/errors/app-error";

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  const { message } = err;

  if (err instanceof AppError) {
    const { statusCode } = err;

    return response.status(statusCode).json({ message });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${message}`,
  });
};

export { errorHandler };
