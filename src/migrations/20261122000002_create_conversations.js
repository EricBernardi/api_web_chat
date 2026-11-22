exports.up = (knex) =>
  knex.schema.createTable('conversations', (t) => {
    t.charset('utf8mb4');
    t.collate('utf8mb4_unicode_ci');

    t.bigIncrements('id');
    t.enu('type', ['direct', 'group']).notNullable();
    t.string('title', 150).nullable();
    t.bigInteger('created_by').unsigned().notNullable()
      .references('id').inTable('users');
    t.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    t.specificType(
      'updated_at',
      'DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    );
  });

exports.down = (knex) => knex.schema.dropTableIfExists('conversations');