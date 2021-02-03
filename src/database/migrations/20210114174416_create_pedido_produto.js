exports.up = knex => knex.schema.createTable('pedido_produtos', table => {
    table.increments('id').primary()
    table.integer('pedido_id').unsigned().references('pedidos.id').notNullable().onDelete('CASCADE')
    table.integer('produto_id').unsigned().references('produtos.id').notNullable().onDelete('CASCADE')
    table.datetime('data').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.decimal('quantidade', 10, 3).notNullable()
    table.decimal('valor_total_individual', 10, 2).notNullable()
    table.string('observacao');
})

exports.down = knex => knex.schema.dropTable('pedido_produtos');
