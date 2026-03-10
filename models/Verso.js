const mongoose = require('mongoose');

const VersoSchema = new mongoose.Schema({
  capitulo_numero: Number,
  capitulo_titulo: String,
  verso_numero: Number,
  sanskrito_original: String,
  transliteracao: String,
  traducao_completa: String,
  significado: String
});

module.exports = mongoose.model('Verso', VersoSchema);