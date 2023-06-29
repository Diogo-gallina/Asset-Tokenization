import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('tokens_purchase', (table) => {
        table.dropColumn('token_id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('tokens_purchase', (table) => {
        table.string('token_id');
    });
}

