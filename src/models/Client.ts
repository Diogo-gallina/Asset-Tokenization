import { Token } from "./Token";

export class Client{
    id: number;
    name: string;
    balance: number;
    purchasedTokens: Token[];
  
    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this.balance = balance;
      this.purchasedTokens = [];
    }

    buyTokens(token: Token, quantity: number): void {
        if (this.balance < token.value * quantity) {
          throw new Error('Insufficient balance');
        }
    
        this.balance -= token.value * quantity;
    
        for (let i = 0; i < quantity; i++) {
          this.purchasedTokens.push(token);
        }
      }
  
}