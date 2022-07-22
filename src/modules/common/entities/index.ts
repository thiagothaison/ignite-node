import { CreateDateColumn, BeforeInsert, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

abstract class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @BeforeInsert()
  createId(): void {
    this.id = uuidV4();
  }

  @BeforeInsert()
  fillCreatedAt(): void {
    this.createdAt = new Date();
  }
}

export default BaseEntity;
