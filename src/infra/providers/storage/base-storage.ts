import crypto from "crypto";
import { extname } from "path";

abstract class BaseStorage {
  protected getFileName = (file: Express.Multer.File) => {
    const fileHash = crypto.randomBytes(16).toString("hex");

    return `${fileHash}${extname(file.originalname)}`;
  };
}

export { BaseStorage };
