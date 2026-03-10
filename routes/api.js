const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistantController');

// O Nadi da Inteligência: A rota que recebe o texto do usuário e acorda Lucce
router.post('/oraculo/invocar', assistantController.consultarOraculo);

// (Futuro) O Nadi da Memória: Aqui entrarão as rotas do noteController para salvar no MongoDB
// router.post('/notas/salvar', noteController.salvarNota);

module.exports = router;