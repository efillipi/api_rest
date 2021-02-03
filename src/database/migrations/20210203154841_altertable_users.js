exports.up = knex => knex.schema.alterTable('users', function(t) {
    t.unique('email')
  })

exports.down = knex => knex.schema.alterTable('users', function(t) {
    t.dropUnique('email')
  })