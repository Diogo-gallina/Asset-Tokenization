import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('clients', (table)=> {
        table.uuid('id').primary();
        table.text('name').notNullable();
        table.text('cpf').notNullable();
        table.decimal('balance').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('clients');
}

