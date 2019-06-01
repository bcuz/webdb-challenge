exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(tbl) {
    // we must use the callback syntax for .createTable()
    tbl.increments(); // pass the name if you wanted to be called anything other than id
    tbl
      .string('name')
      .notNullable()
      .unique();
    tbl
      .text('description')
      .notNullable()
    tbl.boolean('completed').defaultsTo(false).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};