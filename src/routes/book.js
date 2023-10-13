var express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const EsquemaBook = require('../models/books');
const router = express.Router();

router.post('/cadastrar',conectarBancoDados,  async function(req, res) {
  try {
    // #swagger.tags = ['Livro']
    let { ISBN, title, numberPages, publishCia} = req.body;
    const respostaBD = await EsquemaBook.create({ISBN, title, numberPages, publishCia});

    res.status(200).json({
    status: "OK",
    statusMensagem: "Livro cadastrado com sucesso",
    resposta: respostaBD
    })

  }  catch (error) {
    if(String(error).includes("dup key")){
      return tratarErrosEsperados(res, 'Error: Já existe um livro com esse ISBN')
    }
    return tratarErrosEsperados(res, error);
  }
});

router.put('/editar/:id', conectarBancoDados, async function (req, res) {
  try {
    //#swagger.tags = ['Livro']
      let idBook = req.params.id;
      let {ISBN, title, numberPages, publishCia} = req.body;

      const checkBook = await EsquemaBook.findOne({_id: idBook});
      if (!checkBook) {
        throw new Error("Livro não encontrado")
      }

      const livroAtualizado = await EsquemaBook.updateOne({ _id: idBook}, {ISBN, title, numberPages, publishCia});
      if(livroAtualizado?.modifiedCount > 0){
        const dadosLivro = await EsquemaBook.findOne({_id: idBook});

        res.status(200).json({
          status: "OK",
          statusMensagem: "Livro editado com sucesso",
          resposta: dadosLivro
      });
      }
    } catch (error) {
      return tratarErrosEsperados(res, error);
    }
});

router.delete('/deletar/:id', conectarBancoDados, async function (req, res) {
    try {
      //#swagger.tags = ['Livro']
      let idBook = req.params.id;
      const checkBook = await EsquemaBook.findOne({_id: idBook});
      if (!checkBook) {
        throw new Error("Livro não encontrado")
      }
      const respostaBD = await EsquemaBook.deleteOne({ _id: idBook});
      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro deletada com sucesso",
        resposta: respostaBD
      })

    } catch (error) {
      return tratarErrosEsperados(res, error);
    }
  
});

module.exports = router;
