exports.up = (knex) =>
  knex.schema.createTable('participants', (t) => {
    t.charset('utf8mb4');
    t.collate('utf8mb4_unicode_ci');

    t.bigIncrements('id');
    t.bigInteger('conversation_id').unsigned().notNullable()
      .references('id').inTable('conversations').onDelete('CASCADE');
    t.bigInteger('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    t.enu('role', ['member', 'admin']).notNullable().defaultTo('member');
    t.bigInteger('last_read_message_id').unsigned().nullable()
      .references('id').inTable('messages').onDelete('SET NULL');
    t.datetime('joined_at').notNullable().defaultTo(knex.fn.now());

    t.unique(['conversation_id', 'user_id'], {
      indexName: 'uq_participants_conversation_user',
    });
    t.index('user_id', 'idx_participants_user');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('participants');