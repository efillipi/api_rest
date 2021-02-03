exports.up = knex => knex.schema.createTable('pedidos', table => {
    table.increments('id').primary()
    table.datetime('data').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.decimal('valor_total').notNullable().defaultTo(0)
    table.text('observacao')
    table.integer('users_id').unsigned().references('users.id').onDelete('SET NULL')
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
})

exports.down = knex => knex.schema.dropTable('pedidos');
