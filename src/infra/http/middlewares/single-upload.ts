import { NextFunction, Request, Response } from "express";
import { resolve } from "path";

const singleUpload = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (!request.file) {
    return next();
  }

  if (!request.file?.filename) {
    const { key } = request.file;
    const parts = key.split("/");
    const filename = parts.pop();

    request.file.filename = filename;
    return next();
  }

  const basePath = resolve(process.cwd(), "storage");
  const baseUrl = `${request.protocol}://${request.get("host")}/static`;
  const filePath = request.file.destination.replace(basePath, "");
  const publicLocation = `${baseUrl}${filePath}/${request.file.filename}`;

  request.file.location = publicLocation;

  return next();
};

export { singleUpload };
