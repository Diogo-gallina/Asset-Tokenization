import { Knex } from 'knex';

declare module 'knex/types/tables' {
    export interface Tables {
        tokens: {
            id: string,
            name: string,
            value: number,
            quantity: number,
            created_at: string,
        }

        clients: {
            id: string,
            name: string,
            cpf: string,
            balance: number,
            created_at: string,
        }
        
        tokens_purchase: {
            id: string,
            client_id: string,
            token_id: string,
            quantity: number,
            value: number,
            created_at: string,
        }
    }
}