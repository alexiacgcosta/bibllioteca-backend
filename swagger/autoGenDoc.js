const mongooseToSwagger = require('mongoose-to-swagger');
const EsquemaBook = require('../src/models/books.js');
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  language: 'pt-BR'
})

const outputFile = './swagger_output.json';
const endpointsFiles = ['../index.js', '../src/routes.js'];

let doc = {
  info: {
    version: "1.0.0",
    title: "API de Biblioteca",
    description: "Documentação da API de Biblioteca"
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor local"
    },
    {
      url: "https://bibllioteca-backend.vercel.app/",
      description: "Servidor de produção"
    }
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    schemas: {
      Livro: mongooseToSwagger(EsquemaBook)
    }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Documentação do Swagger gerada encontra-se no arquivo em " + outputFile);
  if(process.env.NODE_ENV !== 'production'){
    require("../index.js");
  }
})