
export class CreateEntryDTO {
    name: string;
    amount: number;
    category: number;
  
    constructor(name: string, amount: number, category: number) {
        this.name = name;
        this.amount = amount;
        this.category = category;
    }
}