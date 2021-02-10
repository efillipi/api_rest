const express = require('express');
const routes = require('./src/routes/index');
const app = express();
const morgan = require('morgan')

const cors = require('cors')

app.use(morgan('dev'));
app.use(`/uploads`, express.static('uploads'));
app.use(express.json()); // somente json

app.use(cors('*'));
app.use(routes); // rotas criadas

//tratamento de erro caso a rota não exista
app.use((req,res,next) =>{
    const erro = new Error('Não Encontrado');
    erro.status=404;
    next(erro);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem : error.message
        }
    })
});

module.exports = app;