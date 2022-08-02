import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRentalsTable1659399234630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "start_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "end_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "expected_end_at",
            type: "timestamp",
          },
          {
            name: "total",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["car_id"],
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("rentals");

    const promises = table.foreignKeys.map(async (foreignKey) => {
      await queryRunner.dropForeignKey("rentals", foreignKey);
    });

    await Promise.all(promises);

    await queryRunner.dropTable("rentals");
  }
}
