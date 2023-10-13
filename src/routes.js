function routes(app) {
  app.use('/livros', require('./routes/book'));
  return;
}

module.exports = routes;