import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('clients', (table)=> {
        table.uuid('id').primary();
        table.text('name').notNullable();
        table.text('cpf').notNullable();
        table.decimal('balance').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('clients');
}
