import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { AppError } from "@domain/errors/app-error";

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 5,
  duration: 5,
});

const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (_) {
    throw new AppError("Too many requests", 429);
  }
};

export { rateLimiter };
