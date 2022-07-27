import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1658501678388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
          },
          {
            name: "password",
            type: "varchar",
            length: "1024",
          },
          {
            name: "email",
            type: "varchar",
            length: "50",
            isUnique: true,
          },
          {
            name: "driver_license",
            type: "varchar",
            length: "50",
          },
          {
            name: "is_admin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
