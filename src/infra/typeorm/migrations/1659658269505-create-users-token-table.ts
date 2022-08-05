import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsersTokenTable1659658269505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "type",
            type: "enum",
            enum: ["refresh", "recovery"],
          },
          {
            name: "token",
            type: "varchar",
          },
          {
            name: "expires_at",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users_tokens");

    const promises = table.foreignKeys.map(async (foreignKey) => {
      await queryRunner.dropForeignKey("users_tokens", foreignKey);
    });

    await Promise.all(promises);

    await queryRunner.dropTable("users_tokens");
  }
}
