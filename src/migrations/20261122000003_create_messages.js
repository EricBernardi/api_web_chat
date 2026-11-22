exports.up = (knex) =>
  knex.schema.createTable('messages', (t) => {
    t.charset('utf8mb4');
    t.collate('utf8mb4_unicode_ci');

    t.bigIncrements('id');
    t.bigInteger('conversation_id').unsigned().notNullable()
      .references('id').inTable('conversations').onDelete('CASCADE');
    t.bigInteger('sender_id').unsigned().notNullable()
      .references('id').inTable('users');
    t.text('body').notNullable();
    t.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    t.datetime('deleted_at').nullable();

    t.index(['conversation_id', 'created_at'], 'idx_messages_conversation_created');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('messages');