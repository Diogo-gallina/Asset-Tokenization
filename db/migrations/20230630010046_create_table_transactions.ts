import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tokens_purchase', (table)=> {
        table.uuid('id').primary();
        table.uuid('client_id').unsigned().references('id').inTable('clients').notNullable();
        table.uuid('token_id').unsigned().references('id').inTable('tokens').notNullable();
        table.integer('quantity').notNullable();
        table.decimal('value').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
   
        table.foreign('client_id').references('id').inTable('clients');
        table.foreign('token_id').references('id').inTable('tokens');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tokens_purchase');
}


