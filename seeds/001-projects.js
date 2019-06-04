// ./seeds/001-roles.js
exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds
  return knex('projects').insert([
    { name: 'challenge', description: 'doing stuff' },
    { name: 'book site', description: 'barely any users' },
  ]);
};