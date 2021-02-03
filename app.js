const express = require('express');
const routes = require('./src/routes/index');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false})); // apenas dados simples
app.use(bodyParser.json()); // somente json

app.use(routes); // rotas criadas

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});
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