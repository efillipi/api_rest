const knex = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    // -----------------------------
    async login(req, res, next) {

        const { email, senha } = req.body

        if (
            !email ||
            !senha
        ) {
            return res.status(422).send({ mensagem: "Não foi possível efetuar o login, Informações incompletas. Tente novamente." });
        }

        const login = await knex('users')
            .where('email', email)
            .select('*')
            .then(login => {
                if (!login || login.length == 0) {
                    return res.status(401).send({ mensagem: "Falha na autenticação" })
                }
                bcrypt.compare(req.body.senha, login[0].senha, (err, result) => {
                    if (err) {
                        return res.status(401).send({ mensagem: "Falha na autenticação" + err })
                    }
                    if (result) {
                        const token = jwt.sign({
                            userId: login[0].id,
                            email: login[0].email,
                            nome: login[0].nome
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            });
                        return res.status(200).send({
                            message: 'Autenticado com sucesso',
                            user: {
                                userId: login[0].id,
                                email: login[0].email,
                                nome: login[0].nome
                            },
                            token: token
                        });
                    }
                    return res.status(401).send({ message: 'Falha na autenticação' })
                })
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao efetuar o login, informe o administrador do sistema. " + err })
            })
    },
    // -----------------------------
}
