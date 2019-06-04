exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function(tbl) {
    // we must use the callback syntax for .createTable()
    tbl.increments(); // pass the name if you wanted to be called anything other than id
    tbl
      .text('description')
      .notNullable()
    tbl
      .text('notes')
      .notNullable()
    tbl.boolean('completed').defaultsTo(false).notNullable();
    tbl
    .integer('project_id')
    .notNullable()
    .references('id')
    .inTable('projects');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions');
};