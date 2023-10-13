const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const swaggerOptions = { customCssUrl: './public/swagger-ui.css'};
const routes = require('./src/routes');


const authDocProducao = require('./src/middlewares/authDoc');
const app = express();
require('dotenv').config();

//configuração do express
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//rotas do swagger
routes(app);

//doc do swagger
if (process.env.NODE_ENV !== 'test') {
  
  app.get('/', (req, res) => { /* #swagger.ignore = true */ res.redirect('/doc'); });
  app.use('/doc', authDocProducao, swaggerUi.serve);
  app.get('/doc', swaggerUi.setup(swaggerFile, swaggerOptions));
}




//inicialização do servidor
if (process.env.NODE_ENV !== 'test') {
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
}

module.exports = app;
