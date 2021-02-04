require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const moment = require('moment')
const bcrypt = require('bcrypt');
// -------------------------------------------------
router.get('/', (req,res, next) => {
    const usuarios = knex('users')
        .select('*')
        .then(usuarios => {
            if(usuarios.length == 0) 
                return res.status(404).send({mensagem: "Não foi encontrado nenhum produto."});
            
                const response = {
                    quantidade: usuarios.length,
                    usuarios: usuarios.map(usuario => {
                        return {
                            idUser: usuario.id,
                            nome:usuario.nome,
                            email:usuario.email,
                            facebook_token: usuario.facebook_token,
                            nivel_acesso: usuario.nivel_acesso,
                            created_at: usuario.created_at,
                            updated_at: usuario.updated_at,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico',
                                url: process.env.URL_API + 'usuarios/' + usuario.id
                            }
                        }
                    })
                }
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send({mensagem: "Erro no servidor ao consultar os produtos, informe o administrador do sistema." + err})
        })
});
// -------------------------------------------------
router.post('/', (req,res, next) => {

    const created_at = moment().format(); 
    const updated_at = moment().format(); 
   
    const {
        nome,
        email,
        senha,
        facebook_token,
        nivel_acesso,
    } = req.body;
    if(
        !nome||
        !email||
        !senha||
        !nivel_acesso
    ) {
        return res.status(422).send({mensagem: "Não foi possível cadastrar este Usuario. Informações incompletas. Tente novamente."});
    }
    const usuarios = knex('users')
        .where('email',email)
        .then(usuarios => {
            console.log(usuarios.length)
            if(usuarios.length >0)
            {
                return res.status(409).send({mensagem: "Usuario ja cadastrado."});
            }
            else{
                bcrypt.hash(req.body.senha, 5,(errbcrypt,hash)=>{
                    if(errbcrypt) {
                        return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + errbcrypt})
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
                        if(!create_user || create_user.length == 0) 
                            return res.status(400).send({mensagem: "Não foi possível cadastrar este create_user. Tente novamente."});
                
                            const response = {
                                mensagem: 'Produto Inserido com Sucesso',
                                produtoCriado: {
                                        idUser: create_user,
                                        nome:req.body.nome,
                                        email:req.body.email,
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
                        return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + err})
                    })
                })
            }
        })
        .catch(err => {
            return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + err})
        })
        
});
// -------------------------------------------------
router.get('/:idUser', (req,res, next) => {
    const { idUser }  = req.params;
        
        if(!idUser) {
            return res.status(422).send({mensagem: "O ID informado é inválido."})
        }
        const usuario = knex('users')
        .select('*')
        .where('id', idUser)
        .then(usuario => {
            if(!usuario || usuario.length == 0) 
                return res.status(404).send({mensagem: "Não foi encontrado nenhum usuario."});
                const response = {
                    mensagem: 'Produto alterado com Sucesso',
                    usuario: {
                            idUser: usuario[0].id,
                            nome:usuario[0].nome,
                            email:usuario[0].email,
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
            return res.status(500).send({mensagem: "Erro no servidor ao consultar o produto, informe o administrador do sistema. " + err})
        })
});
// -------------------------------------------------
router.put('/:idUser', (req,res, next) => {

    const { idUser }  = req.params;
    const updated_at = moment().format(); 
   
    const {
        nome,
        email,
        senha,
        facebook_token,
        nivel_acesso,
    } = req.body;
    if(
        !nome||
        !email||
        !senha||
        !nivel_acesso
    ) {
        return res.status(422).send({mensagem: "Não foi possível cadastrar este Usuario. Informações incompletas. Tente novamente."});
    }

    const usuarios = knex('users')
        .where('email',email)
        .then(usuarios => {
            console.log(usuarios.length)
            if(usuarios.length >0)
            {
                return res.status(409).send({mensagem: "Usuario ja cadastrado."});
            }
            else{
                bcrypt.hash(req.body.senha, 5,(errbcrypt,hash)=>{
                    if(errbcrypt) {
                        return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + errbcrypt})
                    }
                    const create_user = knex('users')
                    .where('id', idUser)
                    .update({
                        nome,
                        email,
                        senha: hash,
                        facebook_token,
                        nivel_acesso,
                        updated_at
                    })
                    .then(create_user => {
                        if(!create_user || create_user.length == 0) 
                            return res.status(400).send({mensagem: "Não foi possível cadastrar este create_user. Tente novamente."});
                
                            const response = {
                                mensagem: 'Produto Aletado com Sucesso',
                                produtoCriado: {
                                        idUser: create_user,
                                        nome:req.body.nome,
                                        email:req.body.email,
                                        facebook_token: req.body.facebook_token,
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
                        return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + err})
                    })
                })











                
            }
        })
        .catch(err => {
            return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o Usuario, informe o administrador do sistema. " + err})
        })
        
});
// -------------------------------------------------
router.delete('/:idUser', (req,res, next) => {
    const { idUser }  = req.params;
        
        if(!idUser) {
            return res.status(422).send({mensagem: "O ID informado é inválido."})
        }
        knex('users')
        .where('id', idUser)
        .del()
        .then(pedido => {
            if(!pedido || pedido.length == 0) 
                return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
            const response = {
                mensagem: "Excluido com sucesso",
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna os detalhes de um pedido específico',
                    url: process.env.URL_API + 'usuarios/' + idUser
                }
            }
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send({mensagem: "Erro no servidor ao editar o pedido, informe o administrador do sistema. " + err})
        })
});
// -------------------------------------------------
module.exports = router;