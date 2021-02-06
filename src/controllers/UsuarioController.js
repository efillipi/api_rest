const knex = require('../database/index');
const moment = require('moment')
const bcrypt = require('bcrypt')

module.exports = {
    // -------------------------------------------------
    async getall(req, res, next) {
        const usuarios = await knex('users')
            .select('*')
            .then(usuarios => {
                if (usuarios.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum usuario." });
                const response = {
                    quantidade: usuarios.length,
                    usuarios: usuarios.map(usuario => {
                        return {
                            idUser: usuario.id,
                            nome: usuario.nome,
                            email: usuario.email,
                            facebook_token: usuario.facebook_token,
                            nivel_acesso: usuario.nivel_acesso,
                            created_at: usuario.created_at,
                            updated_at: usuario.updated_at,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um usuario específico',
                                url: process.env.URL_API + 'usuarios/' + usuario.id
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao consultar os usuarios, informe o administrador do sistema." + err })
            })
    },
    // -------------------------------------------------
    async create(req, res, next) {

        const created_at = moment().format();
        const updated_at = moment().format();

        const {
            nome,
            email,
            senha,
            facebook_token,
            nivel_acesso,
        } = req.body;
        if (
            !nome ||
            !email ||
            !senha ||
            !nivel_acesso
        ) {
            return res.status(422).send({ mensagem: "Não foi possível cadastrar este Usuario. Informações incompletas. Tente novamente." });
        }
        const usuarios = await knex('users')
            .where('email', email)
            .then(usuarios => {

                if (usuarios.length > 0) {
                    return res.status(409).send({ mensagem: "Usuario ja cadastrado." });
                }
                else {
                    bcrypt.hash(req.body.senha, 5, (errbcrypt, hash) => {
                        if (errbcrypt) {
                            return res.status(500).send({ mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + errbcrypt })
                        }
                        const create_user = knex('users').insert({
                            nome,
                            email,
                            senha: hash,
                            facebook_token,
                            nivel_acesso,
                            created_at,
                            updated_at
                        })
                            .then(create_user => {
                                if (!create_user || create_user.length == 0)
                                    return res.status(400).send({ mensagem: "Não foi possível cadastrar este usuario. Tente novamente." });

                                const response = {
                                    mensagem: 'usuario Inserido com Sucesso',
                                    usuarioCriado: {
                                        idUser: create_user,
                                        nome: req.body.nome,
                                        email: req.body.email,
                                        facebook_token: req.body.facebook_token,
                                        nivel_acesso: req.body.nivel_acesso,
                                        created_at: created_at,
                                        updated_at: updated_at,
                                        request: {
                                            tipo: 'GET',
                                            descricao: 'Retorna todos os usuarios',
                                            url: process.env.URL_API + 'usuarios'
                                        }
                                    }
                                }
                                return res.status(201).send(response);
                            })
                            .catch(err => {
                                return res.status(500).send({ mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + err })
                            })
                    })
                }
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + err })
            })

    },
    // -------------------------------------------------
    async byid(req, res, next) {
        const { idUser } = req.params;

        if (!idUser) {
            return res.status(422).send({ mensagem: "O ID informado é inválido." })
        }
        const usuario = await knex('users')
            .select('*')
            .where('id', idUser)
            .then(usuario => {
                if (!usuario || usuario.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum usuario." });
                const response = {
                    usuario: {
                        idUser: usuario[0].id,
                        nome: usuario[0].nome,
                        email: usuario[0].email,
                        facebook_token: usuario[0].facebook_token,
                        nivel_acesso: usuario[0].nivel_acesso,
                        created_at: usuario[0].created_at,
                        updated_at: usuario[0].updated_at,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os usuarios',
                            url: process.env.URL_API + 'usuarios'
                        }
                    }
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao consultar o usuario, informe o administrador do sistema. " + err })
            })
    },

    async put(req, res, next) {

        const { idUser } = req.params;
        const updated_at = moment().format();

        const {
            nome,
            nivel_acesso,
        } = req.body;
        if (
            !nome ||
            !nivel_acesso
        ) {
            return res.status(422).send({ mensagem: "Não foi possível alterar este Usuario. Informações incompletas. Tente novamente." });
        }

        const create_user = knex('users')
            .where('id', idUser)
            .update({
                nome,
                nivel_acesso,
                updated_at
            })
            .then(create_user => {
                if (!create_user || create_user.length == 0)
                    return res.status(400).send({ mensagem: "Não foi possível alterar este usuario. Tente novamente." });

                const response = {
                    mensagem: 'usuario Aletado com Sucesso',
                    usuarioCriado: {
                        idUser: create_user,
                        nome: req.body.nome,
                        nivel_acesso: req.body.nivel_acesso,
                        updated_at: updated_at,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os usuarios',
                            url: process.env.URL_API + 'usuarios'
                        }
                    }
                }
                return res.status(201).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao alterar o Usuario, informe o administrador do sistema. " + err })
            })


    },

    async delete(req, res, next) {
        const { idUser } = req.params;

        if (!idUser) {
            return res.status(422).send({ mensagem: "O ID informado é inválido." })
        }
        knex('users')
            .where('id', idUser)
            .del()
            .then(users => {
                if (!users || users.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum usuario." });
                const response = {
                    mensagem: "Excluido com sucesso",
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os detalhes de um usuario específico',
                        url: process.env.URL_API + 'usuarios/' + idUser
                    }
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao editar o usuario, informe o administrador do sistema. " + err })
            })
    },
    // -------------------------------------------------
}