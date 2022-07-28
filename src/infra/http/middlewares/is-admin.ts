import { NextFunction, Request, Response } from "express";

import { AppError } from "@domain/errors/app-error";

const isAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const user = request?.user;

  if (!user) {
    throw new AppError("User not found", 401);
  }

  if (!user.isAdmin) {
    throw new AppError("Resource not found", 401);
  }

  next();
};

export { isAdmin };
