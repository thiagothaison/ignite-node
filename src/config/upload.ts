import { Options } from "multer";
import { container, inject, injectable } from "tsyringe";

import { IStorageProvider } from "@domain/contracts/providers/storage";

@injectable()
class UploadConfiguration {
  constructor(
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  getConfig(directory: string): Options {
    return {
      storage: this.storageProvider.getMulterStorage(directory),
    };
  }
}

export default container.resolve(UploadConfiguration);
export { UploadConfiguration };
