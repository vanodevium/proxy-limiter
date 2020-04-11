exports.seed = function(knex) {
  return knex('parsers').del()
    .then(function () {
      return knex('parsers').insert([
        {id: 1, slug: 'test', proxy_id: 1, limit: 2}
      ]);
    });
};