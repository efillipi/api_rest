const moment = require('moment')
const knex = require('../database/index');

module.exports = {
    // -----------------------------
    async getall(req,res, next){
        const pedidos = await knex('pedidos')
            .select('*')
            .then(pedidos => {
                if(pedidos.length == 0) 
                    return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
                const response = {
                    quantidade: pedidos.length,
                    pedidos: pedidos.map(pedi => {
                        return {
                            idpedi: pedi.id,
                            data: pedi.data,
                            valor_total: pedi.valor_total,
                            observacao: pedi.observacao,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedido específico',
                                url: process.env.URL_API + 'pedidos/' + pedi.id
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({mensagem: "Erro no servidor ao consultar os produtos, informe o administrador do sistema." + err})
            })
    },
    // -----------------------------
    async create(req,res, next ){
        try {
            const vazio = Boolean;
            const users_id = 2;
            const created_at = moment().format(); 
            const updated_at = moment().format(); 
            const { produtos }  = req.body;
    
            if(!produtos) {
                return res.status(422).send({mensagem: "O produto informado é inválido."})
            }
            produtos.map((item => {
                if(
                    !item.produto_id||
                    !item.quantidade||
                    !item.valor
                    ) {
                    vazio = false;
                }
            }));
    
            if(vazio === false) {
                return res.status(422).send({mensagem: "O produto informado é inválido."})
            }
    
            const {
                observacao,
                data,
                valor_total,
            } = req.body;
    
            if(
                !data||
                !valor_total
            ) {
                return res.status(422).send({mensagem: "Não foi possível vincular o produto. Tente novamente."});
            }
    
            const pedido = await knex('pedidos').insert({
                data,
                valor_total,
                observacao,
                users_id,
                created_at,
                updated_at
            })
            .then(pedido => {
                if(pedido.length == 0) 
                    return res.status(404).send({mensagem: "Não foi encontrado nenhum produto."});
    
            const pedido_produtos = produtos
                .map((item => {
                    return {
                        pedido_id: pedido,
                        produto_id: item.produto_id,
                        data : data,
                        quantidade : item.quantidade,
                        valor_total_individual: item.valor * item.quantidade,
                        observacao : item.observacao_pedido
                    }
                }));
                    
            const pedido_produto =  knex('pedido_produtos').insert(pedido_produtos)
            .then(pedido_produto => {
            if(pedido_produto.length == 0) 
                return res.status(404).send({mensagem: "Não foi encontrado nenhum produto."});
                
            const response = {
                mensagem: "Pedido Alterado com exito.",
                pedido_id: pedido,
                data,
                valor_total,
                observacao,
                produtos: 
                produtos.map((item => {
                    return {
                        produto_id: item.produto_id,
                        quantidade : item.quantidade,
                        observacao : item.observacao,
                        valor_total_individual: item.valor * item.quantidade,
                    }
                }))
            }
            return res.status(200).send(response);
            })   
        }) 

                
        } catch (error) {
            return res.status(500).send({mensagem: "Erro no servidor ao cadastrar o pedido, informe o administrador do sistema. " + error})
        }
    },
    // -----------------------------
    async byid(req,res, next ){
        const idPedido =req.params.idPedido;
        const pedido = await knex('pedidos')
        .where('id',idPedido)
        .select('*')
        .then(pedido => {
            if(pedido.length == 0) 
                return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
            const pedido_produtos = knex('pedido_produtos')
                .join('pedidos', 'pedidos.id', '=', 'pedido_produtos.pedido_id')
                .join('produtos', 'produtos.id', '=', 'pedido_produtos.produto_id')
                .where('pedidos.id',idPedido)
                .select(
                    'produtos.*',
                    'pedido_produtos.quantidade',
                    'pedido_produtos.valor_total_individual',
                    'pedido_produtos.observacao',
                )
                .then(pedido_produtos => {
                    if(pedido_produtos.length == 0) 
                        return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
                    const response = {
                        pedido:{
                            id: pedido[0].id,
                            data: pedido[0].data,
                            valor_total: pedido[0].valor_total,
                            observacao: pedido[0].observacao,
                            users_id: pedido[0].users_id,
                            created_at: pedido[0].created_at,
                            updated_at: pedido[0].updated_at,
                            quantidadeProdutos: pedido_produtos.length,
                            produtos : pedido_produtos,       
                        },      
                    }
                    return res.status(200).send(response);
                })
        })
            .catch(err => {
                return res.status(500).send({mensagem: "Erro no servidor ao consultar os produtos, informe o administrador do sistema." + err})
            })
    },
    // -----------------------------
    async put(req,res, next ){
    
        const { idPedido }  = req.params;
        
        const vazio = Boolean;
        const users_id = 2;
        const updated_at = moment().format(); 
        const { produtos }  = req.body;
    
        if(!produtos) {
            return res.status(422).send({mensagem: "O produto informado é inválido."})
        }
        produtos.map((item => {
            if(
                !item.produto_id||
                !item.quantidade||
                !item.valor
                ) {vazio = false;}
        }));
        if(vazio === false) {return res.status(422).send({mensagem: "O produto informado é inválido."})}
    
        const {
            observacao,
            data,
            valor_total,
        } = req.body;
    
        if(
            !data||
            !valor_total
        ) {return res.status(422).send({mensagem: "Não foi possível vincular o produto. Tente novamente."});}
    
            const pedido = await knex('pedidos')
            .where('id', idPedido)
            .update({
                data,
                valor_total,
                observacao,
                users_id,
                updated_at
            })
            .then(pedido => {
                if(!pedido || pedido.length == 0) 
                    return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
                const pedido_produtos_del = knex('pedido_produtos')
                .where('pedido_id', idPedido)
                .del()
                .then(pedido_produtos_del => {
                    if(!pedido_produtos_del || pedido_produtos_del.length == 0) 
                        return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
                    const pedido_produtos = produtos.map((item => {
                        return {
                            pedido_id: idPedido,
                            produto_id: item.produto_id,
                            data : data,
                            quantidade : item.quantidade,
                            valor_total_individual: item.valor * item.quantidade,
                            observacao : observacao
                        }
                    }));
                    const pedido_produto = knex('pedido_produtos').insert(pedido_produtos)
                    .then(pedido_produto => {
                    if(pedido_produto.length == 0) 
                        return res.status(404).send({mensagem: "Não foi encontrado nenhum produto."});
                    const response = {
                        mensagem: "Pedido Alterado com exito.",
                        pedido,
                        data,
                        valor_total,
                        observacao,
                        produtos: 
                        produtos.map((item => {
                            return {
                                produto_id: item.produto_id,
                                quantidade : item.quantidade,
                                observacao : item.observacao,
                                valor_total_individual: item.valor * item.quantidade,
                            }
                        }))
                    }
                    return res.status(200).send(response);
                    }) 
                })
            })
            .catch(err => {
                return res.status(500).send({mensagem: "Erro no servidor ao editar o pedido, informe o administrador do sistema. " + err})
            })
    },
    // -----------------------------
    async delete(req,res, next ){
        const { idPedido }  = req.params;
            
            if(!idPedido) {
                return res.status(422).send({mensagem: "O ID informado é inválido."})
            }
            knex('pedidos')
            .where('id', idPedido)
            .del()
            .then(pedido => {
                if(!pedido || pedido.length == 0) 
                    return res.status(404).send({mensagem: "Não foi encontrado nenhum pedido."});
                const response = {
                    mensagem: "Excluido com sucesso",
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os detalhes de um pedido específico',
                        url: process.env.URL_API + 'pedidos/' + idPedido
                    }
                }
                return res.status(200).send(response);
            })
            .catch(err => {
                return res.status(500).send({mensagem: "Erro no servidor ao editar o pedido, informe o administrador do sistema. " + err})
            })
    }
    // -----------------------------
}
