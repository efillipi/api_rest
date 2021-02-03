exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('nome').notNullable()
    table.string('email').notNullable()
    table.string('senha').notNullable()
    table.string('facebook_token')
    table.integer('nivel_acesso').notNullable().defaultTo(1)
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
})

exports.down = knex => knex.schema.dropTable('users');
