exports.up = knex => knex.schema.createTable('categorias', table => {
    table.increments('id')
    table.string('nome').notNullable()
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
})

exports.down = knex => knex.schema.dropTable('categorias');
