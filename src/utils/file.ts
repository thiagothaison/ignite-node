import fs from "fs";

const deleteFile = (filename: string) => {
  try {
    fs.statSync(filename);
  } catch (err) {
    return;
  }

  fs.unlinkSync(filename);
};

export { deleteFile };
