const moment = require('moment')
const knex = require('../database/index');

module.exports = {
    // -----------------------------
    async getall(req, res, next) {
        const produtos = await knex('produtos')
            .select('*')
            .where('ativo', 'ativo')
            .then(produtos => {
                if (produtos.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum produto." });

                const response = {
                    quantidade: produtos.length,
                    produtos: produtos.map(produto => {
                        return {
                            produto,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico',
                                url: process.env.URL_API + 'produtos/' + produto.id
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao consultar os produtos, informe o administrador do sistema." + err })
            })
    },
    // -----------------------------
    async create(req, res, next) {

        const created_at = moment().format();
        const updated_at = moment().format();
        const {
            codigo,
            nome,
            descricao,
            descricao_curta,
            valor,
            ativo,
            categoria_id
        } = req.body;
        if (
            !codigo ||
            !nome ||
            !descricao ||
            !descricao_curta ||
            !valor ||
            !ativo ||
            !categoria_id
        ) {
            return res.status(422).send({ mensagem: "Não foi possível cadastrar este produto. Informações incompletas. Tente novamente." });
        }

        const produto = await knex('produtos').insert({
            codigo,
            nome,
            descricao,
            descricao_curta,
            imagem: req.file.path,
            valor,
            ativo,
            categoria_id,
            created_at,
            updated_at
        })
            .then(produto => {
                if (!produto || produto.length == 0)
                    return res.status(400).send({ mensagem: "Não foi possível cadastrar este produto. Tente novamente." });

                const response = {
                    mensagem: 'Produto Inserido com Sucesso',
                    produtoCriado: {
                        idProduto: produto,
                        nome: req.body.nome,
                        codigo: req.body.codigo,
                        descricao: req.body.descricao,
                        descricao_curta: req.body.descricao_curta,
                        imagem: req.file.path,
                        valor: req.body.valor,
                        ativo: req.body.ativo,
                        categoria_id: req.body.categoria_id,
                        created_at: req.body.created_at,
                        updated_at: req.body.updated_at,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: process.env.URL_API + 'produtos'
                        }
                    }
                }
                return res.status(201).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao cadastrar o produto, informe o administrador do sistema. " + err })
            })
    },
    // -----------------------------
    async byid(req, res, next) {
        const { idProduto } = req.params;

        if (!idProduto) {
            return res.status(422).send({ mensagem: "O ID informado é inválido." })
        }
        const produto = await knex('produtos')
            .select('*')
            .where('id', idProduto)
            .where('ativo', 'ativo')
            .then(produto => {
                if (!produto || produto.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum produto." });
                const response = {
                    produto,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os produtos',
                        url: process.env.URL_API + 'produtos/'
                    }
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao consultar o produto, informe o administrador do sistema. " + err })
            })
    },
    // -----------------------------
    async put(req, res, next) {

        const { idProduto } = req.params;
        const updated_at = moment().format();
        if (!idProduto) {
            return res.status(422).send({ mensagem: "O ID informado é inválido." })
        }
        const {
            codigo,
            nome,
            descricao,
            descricao_curta,
            valor,
            ativo,
            categoria_id
        } = req.body;

        if (
            !codigo ||
            !nome ||
            !descricao ||
            !descricao_curta ||
            !valor ||
            !ativo ||
            !categoria_id
        ) {
            return res.status(422).send({ mensagem: "Não foi possível editar este produto. Informações incompletas. Tente novamente." });
        }

        const produto = await knex('produtos')
            .where('id', idProduto)
            .update({
                codigo,
                nome,
                descricao,
                descricao_curta,
                valor,
                ativo,
                categoria_id,
                updated_at
            })
            .then(produto => {
                if (!produto || produto.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum produto." });
                const response = {
                    produtos: {
                        idProduto: idProduto,
                        nome: req.body.nome,
                        codigo: req.body.codigo,
                        descricao: req.body.descricao,
                        descricao_curta: req.body.descricao_curta,
                        valor: req.body.valor,
                        ativo: req.body.ativo,
                        categoria_id: req.body.categoria_id,
                        updated_at: updated_at,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: process.env.URL_API + 'produtos/' + idProduto
                        }
                    }
                }
                return res.status(202).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao editar o produto, informe o administrador do sistema. " + err })
            })
    },
    // -----------------------------
    async delete(req, res, next) {
        const { idProduto } = req.params;

        if (!idProduto) {
            return res.status(422).send({ mensagem: "O ID informado é inválido." })
        }
        const produto = await knex('produtos')
            .where('id', idProduto)
            .del()
            .then(produto => {
                if (!produto || produto.length == 0)
                    return res.status(404).send({ mensagem: "Não foi encontrado nenhum produto." });

                const response = {
                    mensagem: "Excluido com sucesso",
                    produtos: {
                        request: {
                            tipo: 'DEL',
                            descricao: 'Deleta um produto específico',
                            url: process.env.URL_API + 'produtos/' + idProduto
                        }
                    }
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({ mensagem: "Erro no servidor ao editar o produto, informe o administrador do sistema. " + err })
            })
    },
    // -----------------------------
}
