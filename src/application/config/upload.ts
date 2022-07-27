import crypto from "crypto";
import multer from "multer";
import { resolve, extname } from "path";

const upload = (directory: string) => {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", "storage", directory),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const fileName = `${fileHash}${extname(file.originalname)}`;

        return callback(null, fileName);
      },
    }),
  };
};

export default {
  upload,
};
