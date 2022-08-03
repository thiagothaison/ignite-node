import fs from "fs";
import { resolve } from "path";

const deleteFile = (filename: string) => {
  const filenamePath = resolve(process.cwd(), filename);

  try {
    fs.statSync(filenamePath);
  } catch (err) {
    return;
  }

  fs.unlinkSync(filenamePath);
};

export { deleteFile };
