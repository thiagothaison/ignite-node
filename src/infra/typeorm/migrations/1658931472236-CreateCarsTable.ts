import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsTable1658931472236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "15",
          },
          {
            name: "description",
            type: "varchar",
            length: "100",
          },
          {
            name: "daily_rate",
            type: "numeric",
          },
          {
            name: "available",
            type: "boolean",
            default: true,
          },
          {
            name: "license_plate",
            type: "varchar",
            length: "100",
          },
          {
            name: "fine_amount",
            type: "numeric",
          },
          {
            name: "brand",
            type: "varchar",
            length: "50",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["category_id"],
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("cars");

    const promises = table.foreignKeys.map(async (foreignKey) => {
      await queryRunner.dropForeignKey("cars", foreignKey);
    });

    await Promise.all(promises);

    await queryRunner.dropTable("cars");
  }
}
