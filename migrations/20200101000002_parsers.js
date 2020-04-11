exports.up = function(knex) {
    return knex.schema
      .createTable('parsers', function (table) {
         table.increments('id').primary();
         table.string('slug', 255).unique().notNullable();
         table.integer('proxy_id').unsigned();
         table.integer('limit').unsigned().defaultTo(0);

         table.foreign('proxy_id').references('id').inTable('proxies');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('parsers');
  };
  
  exports.config = { transaction: false };