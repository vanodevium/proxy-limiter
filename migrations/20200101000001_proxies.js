exports.up = function(knex) {
    return knex.schema
      .createTable('proxies', function (table) {
         table.increments('id').primary();
         table.string('slug', 255).unique().notNullable();
         table.string('name', 255).notNullable();
         table.string('ip', 255).notNullable();
         table.integer('limit').defaultTo(0);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('proxies');
  };
  
  exports.config = { transaction: false };