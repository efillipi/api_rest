exports.seed = function(knex) {
  return knex('usuarios').del()
    .then(function () {
      return knex('usuarios').insert([
        {nome: 'Matheus Eduardo', email: 'matheuseduardosramos@gmail.com', senha: 'admin123', facebook_token: null, nivel_acesso: 10, }
      ]);
    });
};