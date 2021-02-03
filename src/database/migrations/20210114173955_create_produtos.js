exports.up = knex => knex.schema.createTable('produtos', table => {
    table.increments('id').primary()
    table.integer('codigo').notNullable()
    table.string('nome').notNullable()
    table.text('descricao').notNullable()
    table.string('descricao_curta').notNullable()
    table.string('imagem').notNullable().defaultTo('no-image.png')
    table.decimal('valor', 10, 2).notNullable()
    table.enu('ativo', ['ativo', 'inativo']).notNullable()
    table.integer('categoria_id').unsigned().references('categorias.id').onDelete('SET NULL')
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
})

exports.down = knex => knex.schema.dropTable('produtos');
