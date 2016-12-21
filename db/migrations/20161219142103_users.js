
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments("user_id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.integer("phone_number")
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("users")
  ])
};
