import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('task', (table) => {
        table.date('initDate').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('task', (table) => {
        table.dropColumn('initDate');
    });
}

