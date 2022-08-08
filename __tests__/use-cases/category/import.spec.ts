import fs from "fs";
import tmp from "tmp";

import { ICategoryRepository } from "@domain/contracts/repositories/category";
import { AppError } from "@domain/errors/app-error";
import { ImportCategoryUseCase } from "@domain/use-cases/category/import";

import { CategoryRepository } from "@tests/repositories/category";

let categoryRepository: ICategoryRepository;
let importCategoryUseCase: ImportCategoryUseCase;

describe("Create an category", () => {
  beforeEach(() => {
    categoryRepository = new CategoryRepository();
    importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
  });

  const getMockedFile = (
    contentRule: "valid" | "invalid" | "both" = "valid"
  ) => {
    const tmpCsvFile = tmp.fileSync({
      prefix: "file",
      postfix: ".csv",
      keep: true,
    });

    let content = "SUV,Utilitário esportivo\nSedan,Automóvel de três volumes";
    const invalidContent = ",Empty name\nEmpty description,";

    if (contentRule === "invalid") {
      content = invalidContent;
    } else if (contentRule === "both") {
      content = `${content}\n${invalidContent}`;
    }

    fs.writeFileSync(tmpCsvFile.name, content);

    const mockedFile = {
      fieldname: "file.csv",
      originalname: "file.csv",
      mimetype: "text/csv",
      size: null,
      filename: undefined,
      path: tmpCsvFile.name,
      buffer: undefined,
    };

    mockedFile.buffer = Buffer.from(content);
    mockedFile.size = mockedFile.buffer.length;

    return mockedFile as Express.Multer.File;
  };

  it("Should not be able to import a non-existent file", async () => {
    const fakeFile = {
      fieldname: "file.csv",
      originalname: "file.csv",
      path: "/fake/path/from/file.csv",
    };

    await expect(
      importCategoryUseCase.execute(fakeFile as Express.Multer.File)
    ).rejects.toEqual(new AppError("Upload file does not exists"));
  });

  it("Should not be able to import an invalid file", async () => {
    await expect(
      importCategoryUseCase.execute(getMockedFile("invalid"))
    ).rejects.toEqual(new AppError("This file doest have an valid list"));
  });

  it("Should not be able to import an csv file with only existents categories", async () => {
    await categoryRepository.create({
      name: "SUV",
      description: "Fake description",
    });
    await categoryRepository.create({
      name: "Sedan",
      description: "Fake description",
    });

    await expect(
      importCategoryUseCase.execute(getMockedFile("valid"))
    ).rejects.toEqual(new AppError("Import was not successful"));
  });

  it("Should be able to import only valid categories from an csv file", async () => {
    const result = await importCategoryUseCase.execute(getMockedFile("both"));

    expect(result.successes).toHaveLength(2);
    expect(result.errors).toHaveLength(2);
  });

  it("Should be able to import a csv file with categories", async () => {
    const result = await importCategoryUseCase.execute(getMockedFile());

    expect(result.successes).toHaveLength(2);
    expect(result.errors).toHaveLength(0);
  });
});
