// ./seeds/001-roles.js
exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds
  return knex('actions').insert([
    { notes: 'prob need to integrate babel', description: 'convert es5 to es6', project_id: 2 },
    { notes: 'challenge', description: 'doing stuff', project_id: 1 },
  ]);
};