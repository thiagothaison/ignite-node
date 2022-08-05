import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { jwtKey } from "@config/auth";

import { AppError } from "@domain/errors/app-error";

import { UserRepository } from "@infra/typeorm/repositories/user";

const jwtAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is not provided", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, jwtKey);

    const userRepository = container.resolve(UserRepository);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    request.user = user;

    next();
  } catch (err) {
    throw new AppError("Token is invalid", 401);
  }
};

export { jwtAuth };
