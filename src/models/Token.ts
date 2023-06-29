export class Token{
    id: number;
    name: string;
    value: number;
    availableQuantity: number;
  
    constructor(id: number, name: string,value: number, availableQuantity: number) {
      this.id = id;
      this.name = name;
      this.value = value;
      this.availableQuantity = availableQuantity;
    }

    increaseValueOnPurchase(availableQuantity:number, value:number) {
        const currentQuantity = this.availableQuantity;
        const increaseAmount = this.value * 0.004 * currentQuantity;
        this.value += increaseAmount;
    }
}