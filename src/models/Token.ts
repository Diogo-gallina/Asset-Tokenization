export class Token {
  id: string;
  name: string;
  value: number;
  quantity: number;

  constructor(id: string, name: string, value: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.quantity = quantity;
  }

  public static InitialRandomValue(): number {
    const randomValue = Math.floor(Math.random() * 200000) + 1;
    return randomValue;
  }

  public static InitialRandomQuantity(): number {
    const randomQuantity = Math.floor(Math.random() * 500) + 1;
    return randomQuantity;
  }
}
