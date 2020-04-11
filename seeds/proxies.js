exports.seed = function(knex) {
  return knex('proxies').del()
    .then(function () {
      return knex('proxies').insert([
        {id: 1, name: 'ProxyTest', slug: 'test', ip: 'http://108.59.14.200:13152'}
      ]);
    });
};