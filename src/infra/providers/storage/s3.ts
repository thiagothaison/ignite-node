import { S3Client } from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import multerS3 from "multer-s3";
import { join } from "path";

import { IStorageProvider } from "@domain/contracts/providers/storage";

import { BaseStorage } from "./base-storage";

class S3StorageProvider extends BaseStorage implements IStorageProvider {
  s3Client: S3Client = null;
  client: S3 = null;

  constructor() {
    super();
    this.s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
    this.client = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION,
    });

    console.log("🗄️ AWS S3 storage connected");
  }

  getMulterStorage(directory) {
    return multerS3({
      s3: this.s3Client,
      bucket: process.env.AWS_S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      key: (req, file, cb) => {
        const fileName = this.getFileName(file);

        cb(null, join(directory, fileName));
      },
    });
  }

  async delete(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.deleteObject(
        {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: path,
        },
        (err) => {
          if (err) reject(err);

          resolve();
        }
      );
    });
  }
}

export { S3StorageProvider };
