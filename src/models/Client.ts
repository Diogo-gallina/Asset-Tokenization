import { Token } from "./Token";

export class Client {
  id: string;
  name: string;
  cpf: string;
  balance: number;
  purchasedTokens: Token[];

  constructor(id: string, name: string, cpf: string, balance: number) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.balance = balance;
    this.purchasedTokens = [];
  }

}
