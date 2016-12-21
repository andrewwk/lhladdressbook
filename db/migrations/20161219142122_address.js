
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("addresses", (table) => {
      table.increments("address_id").primary();
      table.integer("user_id").references("user_id");
      table.string("address");
      table.string("city");
      table.string("province");
      table.string("country");
      table.string("postal_code");
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("addresses")
  ])
};
