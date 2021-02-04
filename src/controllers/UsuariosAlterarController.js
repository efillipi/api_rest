const knex = require('../database/index');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')

module.exports = {
    // -----------------------------
    async alterarSenha(req,res, next){

        const { idUser }  = req.params;
        const {senhaAtual,novaSenha } = req.body
        if(
            !senhaAtual||
            !novaSenha
            ) {
                return res.status(422).send({mensagem: "Não foi possível efetuar o login, Informações incompletas. Tente novamente."});
        }
        const user = await knex('users')
        .where('id',idUser)
        .select('*')
        .then( user =>{
            if(!user || user.length ==0)
                { return res.status(401).send({mensagem: "Falha na autenticação"})}
            
                bcrypt.compare(req.body.senhaAtual, user[0].senha, (err, result) =>{
                    if(err){
                        return res.status(401).send({mensagem: "Falha na autenticação" +err})}
                    if(result){ 
                        bcrypt.hash(req.body.novaSenha, 5,(errbcrypt,hash)=>{
                            if(errbcrypt) {
                                return res.status(500).send({mensagem: "Erro no servidor ao Alterar a senha do usuario, informe o administrador do sistema. " + errbcrypt})
                            }
                            const alterar_user = knex('users')
                                .where('id',idUser)
                                .update({
                                    senha: hash, 
                                })
                                .then(alterar_user => {
                                    if(!alterar_user || alterar_user.length == 0) 
                                        return res.status(400).send({mensagem: "Não foi possível Alterar a senha do usuario. Tente novamente."});
                                    const response = {
                                        Usuario: {
                                            mensagem: "Senha alterada com sucesso",
                                            idUser: user[0].id,
                                            nome: user[0].nome,    
                                            request: {
                                                tipo: 'GET',
                                                descricao: 'Retorna os detalhes de um usuario específico',
                                                url: process.env.URL_API + 'usuarios/'+idUser                    
                                            }
                                        }
                                    }
                                return res.status(200).send(response);
                            })
                            .catch(err => {
                                return res.status(500).send({mensagem: "Erro no servidor ao Alterar a senha do usuario, informe o administrador do sistema. " + err})
                            })
                        })
                    }
                    else
                        return res.status(401).send({ message: 'Falha na autenticação' })
                })
        })
        .catch(err => {
            return res.status(500).send({mensagem: "Erro no servidor ao efetuar o login, informe o administrador do sistema. " + err})
        })
    },
    // -----------------------------
    async alterarEmail(req,res, next){

        const { idUser }  = req.params;
        const {emailAtual,novoEmail } = req.body
        if(
            !emailAtual||
            !novoEmail
            ) {
                return res.status(422).send({mensagem: "Não foi possível efetuar o login, Informações incompletas. Tente novamente."});
        }
        const user = await knex('users')
        .where('id',idUser)
        .select('*')
        .then( user =>{
            if(!user || user.length ==0)
                { return res.status(401).send({mensagem: "Falha na autenticação"})}
            
                bcrypt.compare(req.body.senhaAtual, user[0].senha, (err, result) =>{
                    if(err){
                        return res.status(401).send({mensagem: "Falha na autenticação" +err})}
                    if(result){ 
                        bcrypt.hash(req.body.novaSenha, 5,(errbcrypt,hash)=>{
                            if(errbcrypt) {
                                return res.status(500).send({mensagem: "Erro no servidor ao Alterar a senha do usuario, informe o administrador do sistema. " + errbcrypt})
                            }
                            const alterar_user = knex('users')
                                .where('id',idUser)
                                .update({
                                    senha: hash, 
                                })
                                .then(alterar_user => {
                                    if(!alterar_user || alterar_user.length == 0) 
                                        return res.status(400).send({mensagem: "Não foi possível Alterar a senha do usuario. Tente novamente."});
                                    const response = {
                                        Usuario: {
                                            mensagem: "Senha alterada com sucesso",
                                            idUser: user[0].id,
                                            nome: user[0].nome,    
                                            request: {
                                                tipo: 'GET',
                                                descricao: 'Retorna os detalhes de um usuario específico',
                                                url: process.env.URL_API + 'usuarios/'+idUser                    
                                            }
                                        }
                                    }
                                return res.status(200).send(response);
                            })
                            .catch(err => {
                                return res.status(500).send({mensagem: "Erro no servidor ao Alterar a senha do usuario, informe o administrador do sistema. " + err})
                            })
                        })
                    }
                    else
                        return res.status(401).send({ message: 'Falha na autenticação' })
                })
        })
        .catch(err => {
            return res.status(500).send({mensagem: "Erro no servidor ao efetuar o login, informe o administrador do sistema. " + err})
        })
    },
}


