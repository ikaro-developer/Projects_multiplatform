import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("point_itens", (table) => {
    table.increments("id").primary();
    table.string("point_id").notNullable().references("id").inTable("points");
    table.string("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("point_itens");
}
