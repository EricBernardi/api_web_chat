exports.up = (knex) =>
  knex.schema.createTable('users', (t) => {
    t.charset('utf8mb4');
    t.collate('utf8mb4_unicode_ci');

    t.bigIncrements('id');
    t.string('name', 100).notNullable();
    t.string('email', 255).notNullable();
    t.string('password_hash', 255).notNullable();
    t.string('avatar_url', 500).nullable();
    t.datetime('last_seen_at').nullable();
    t.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    t.specificType(
      'updated_at',
      'DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    );

    t.unique('email', { indexName: 'uq_users_email' });
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');