import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSpecificationsCarsTable1659097745237
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "car_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "specification_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["specification_id"],
            referencedTableName: "specifications",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["car_id"],
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("specifications_cars");

    const promises = table.foreignKeys.map(async (foreignKey) => {
      await queryRunner.dropForeignKey("specifications_cars", foreignKey);
    });

    await Promise.all(promises);

    await queryRunner.dropTable("specifications_cars");
  }
}
