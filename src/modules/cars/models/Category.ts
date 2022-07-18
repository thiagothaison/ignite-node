import { v4 as uuidV4 } from "uuid";

class Category {
  id?: string;

  name!: string;

  description!: string;

  createdAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}

export { Category };
