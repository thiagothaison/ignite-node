import fs from "fs";
import multer from "multer";
import { resolve } from "path";

import { IStorageProvider } from "@domain/contracts/providers/storage";

import { BaseStorage } from "./base-storage";

class LocalStorageProvider extends BaseStorage implements IStorageProvider {
  constructor() {
    super();
    console.log("🗄️ Local storage connected");
  }

  getMulterStorage(directory: string) {
    return multer.diskStorage({
      destination: resolve(process.cwd(), "storage", directory),
      filename: (request, file, cb) => {
        const fileName = this.getFileName(file);

        return cb(null, fileName);
      },
    });
  }

  async delete(file: string) {
    const filenamePath = resolve(process.cwd(), file);

    try {
      fs.statSync(filenamePath);
    } catch (err) {
      return;
    }

    fs.unlinkSync(filenamePath);
  }
}

export { LocalStorageProvider };
