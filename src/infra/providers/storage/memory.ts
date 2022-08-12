import { S3 } from "aws-sdk";
import multer from "multer";

import { IStorageProvider } from "@domain/contracts/providers/storage";

import { BaseStorage } from "./base-storage";

class MemoryStorageProvider extends BaseStorage implements IStorageProvider {
  client: S3 = null;

  constructor() {
    super();

    console.log("🗄️ Memory storage connected");
  }

  getMulterStorage(directory) {
    return multer.memoryStorage();
  }

  async delete(path: string): Promise<void> {
    return null;
  }
}

export { MemoryStorageProvider };
