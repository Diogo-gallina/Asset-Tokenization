import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tokens_purchase', (table)=> {
        table.uuid('id').primary();
        table.uuid('client_id').unsigned().references('id').inTable('clients');
        table.uuid('token_id').unsigned().references('id').inTable('tokens');
        table.integer('quantity');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tokens_purchase');
}

