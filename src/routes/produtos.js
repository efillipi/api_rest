const express = require('express');
const router = express.Router();
const moment = require('moment')
require('dotenv').config();
const knex = require('../database/index');

router.get('/', (req,res, next) => {
    const produtos = knex('produtos')
        .select('*')
        .where('ativo','ativo')
        .then(produtos => {
            if(produtos.length == 0) 
                return res.status(404).send({"mensagem": "Não foi encontrado nenhum produto."});
            
                const response = {
                    quantidade: produtos.length,
                    produtos: produtos.map(prod => {
                        return {
                            prod,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico',
                                url: process.env.URL_API + 'produtos/' + prod.id
                            }
                        }
                    })
                }
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send({"mensagem": "Erro no servidor ao consultar os produtos, informe o administrador do sistema." + err})
        })
});

router.post('/', (req,res, next) => {

    const created_at = moment().format(); 
    const updated_at = moment().format(); 

    const {
        codigo,
        nome,
        descricao,
        descricao_curta,
        imagem,
        valor,
        ativo,
        categoria_id
    } = req.body;
    if(
        !codigo || 
        !nome || 
        !descricao || 
        !descricao_curta || 
        !valor || 
        !ativo || 
        !categoria_id
    ) {
        return res.status(422).send({"mensagem": "Não foi possível cadastrar este produto. Informações incompletas. Tente novamente."});
    }

    const produto = knex('produtos').insert({
        codigo,
        nome,
        descricao,
        descricao_curta,
        imagem,
        valor,
        ativo,
        categoria_id,
        created_at,
        updated_at
    })
    .then(produto => {
        if(!produto || produto.length == 0) 
            return res.status(400).send({"mensagem": "Não foi possível cadastrar este produto. Tente novamente."});

            const response = {
                mensagem: 'Produto Inserido com Sucesso',
                produtoCriado: {
                        idProduto: produto,
                        nome: req.body.nome,
                        codigo: req.body.codigo,
                        descricao: req.body.descricao,
                        descricao_curta: req.body.descricao_curta,
                        imagem : req.body.imagem,
                        valor: req.body.valor,
                        ativo : req.body.ativo,
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
        return res.status(500).send({"mensagem": "Erro no servidor ao cadastrar o produto, informe o administrador do sistema. " + err})
    })
});

router.get('/:idProduto', (req,res, next) => {
    const { idProduto }  = req.params;
        
        if(!idProduto) {
            return res.status(422).send({"mensagem": "O ID informado é inválido."})
        }
        const produto = knex('produtos')
        .select('*')
        .where('id', idProduto)
        .where('ativo','ativo')
        .then(produto => {
            if(!produto || produto.length == 0) 
                return res.status(404).send({"mensagem": "Não foi encontrado nenhum produto."});
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
            return res.status(500).send({"mensagem": "Erro no servidor ao consultar o produto, informe o administrador do sistema. " + err})
        })
});

router.put('/:idProduto', (req,res, next) => {

    const { idProduto }  = req.params;
    const updated_at = moment().format(); 
        
        if(!idProduto) {
            return res.status(422).send({"mensagem": "O ID informado é inválido."})
        }
        const {
            codigo,
            nome,
            descricao,
            descricao_curta,
            imagem,
            valor,
            ativo,
            categoria_id
        } = req.body;

        if(
            !codigo || 
            !nome || 
            !descricao || 
            !descricao_curta || 
            !valor || 
            !ativo || 
            !categoria_id
        ) {
            return res.status(422).send({"mensagem": "Não foi possível editar este produto. Informações incompletas. Tente novamente."});
        }

        const produto = knex('produtos')
        .where('id', idProduto)
        .where('ativo','ativo')
        .update({
            codigo,
            nome,
            descricao,
            descricao_curta,
            imagem,
            valor,
            ativo,
            categoria_id,
            updated_at
        })
        .then(produto => {
            if(!produto || produto.length == 0) 
                return res.status(404).send({"mensagem": "Não foi encontrado nenhum produto."});
            const response = {
                produtos: {
                    idProduto: idProduto,
                    nome: req.body.nome,
                    codigo: req.body.codigo,
                    descricao: req.body.descricao,
                    descricao_curta: req.body.descricao_curta,
                    imagem : req.body.imagem,
                    valor: req.body.valor,
                    ativo : req.body.ativo,
                    categoria_id: req.body.categoria_id,
                    updated_at: updated_at,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os detalhes de um produto específico',
                        url: process.env.URL_API + 'produtos/'+idProduto                    
                    }
                }
            }
            return res.status(202).send(response);
        })
        .catch(err => {
            return res.status(500).send({"mensagem": "Erro no servidor ao editar o produto, informe o administrador do sistema. " + err})
        })
});

router.delete('/:idProduto', (req,res, next) => {
    const { idProduto }  = req.params;
        
        if(!idProduto) {
            return res.status(422).send({"mensagem": "O ID informado é inválido."})
        }

        const {
            ativo,
        } = req.body;

        if(
           !idProduto
        ) {
            return res.status(422).send({"mensagem": "Não foi possível Excluir este produto. Informações incompletas. Tente novamente."});
        }
        knex('produtos').where('id', idProduto).update({
            ativo, 
        })
        .then(produto => {
            if(!produto || produto.length == 0) 
                return res.status(404).send({"mensagem": "Não foi encontrado nenhum produto."});
            
            const response = {
                mensagem: "Excluido com sucesso",
                produtos: {
                    request: {
                        tipo: 'DEL',
                        descricao: 'Deleta um produto específico',
                        url: process.env.URL_API + 'produtos/'+idProduto                    
                        }
                    }
                }
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send({"mensagem": "Erro no servidor ao editar o produto, informe o administrador do sistema. " + err})
        })
});

module.exports = router;