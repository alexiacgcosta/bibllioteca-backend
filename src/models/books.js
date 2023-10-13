const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'é obrigatório',
    },
    numberPages: {
      type: Number,
      required: 'é obrigatório',
    },
    ISBN: {
      type: Number,
      default: '',
      unique: true,
    },
    publishCia: {
      type: String,
      required: 'é obrigatório',
    }
  },
  {
    timestamps: true
  }
)

const EsquemaBook = mongoose.model('EsquemaBook', esquema) || mongoose.models.Books;
module.exports = EsquemaBook;