import { StorageEngine } from "multer";

interface IStorageProvider {
  getMulterStorage(directory: string): StorageEngine;
  delete(path: string): Promise<void>;
}

export { IStorageProvider };
