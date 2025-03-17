import { Category } from "./category";

export class Entry {
    id: number;
    name: string;
    amount: number;
    category: Category;
  
    constructor(id: number, name: string, amount: number, category: Category) {
      this.id = id;
      this.name = name;
      this.amount = amount;
      this.category = category;
    }
}