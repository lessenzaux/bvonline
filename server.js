/**
 * [ ARQUITETURA DO PRANA | SERVER.JS ]
 * --------------------------------------------------------------------------
 * Versão: 1.1.0 (Estabilizada)
 * Dharma: Integrar o Mundo Material (Mongo) e o Etéreo (Gemini)
 * --------------------------------------------------------------------------
 */

// A Prótese Neural: Compatibilidade para Node v18+
if (!global.fetch) {
  const nodeFetch = require('node-fetch');
  global.fetch = nodeFetch;
  global.Headers = nodeFetch.Headers;
  global.Request = nodeFetch.Request;
  global.Response = nodeFetch.Response;
}

require('dotenv').config();
// Exibe os primeiros 5 caracteres da chave para provarmos que a troca ocorreu
console.log(`[KALI] Cristal sintonizado: ${process.env.GEMINI_API_KEY.substring(0, 5)}...`);

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// Importações de Infraestrutura
const conectarBanco = require('./config/database');
const Verso = require('./models/Verso');
const { createServerModel } = require('./config/ai');

const app = express();


// ==========================================
// 0. A ROTA DE PULSO (O Teste Vital de Kali)
// ==========================================
// Esta lâmina DEVE ficar aqui no topo. Ela intercepta o sinal antes 
// que ele mergulhe na densidade do banco de dados ou das views.
app.get('/ping', (req, res) => {
  console.log("[KALI] Pulso acessado. O Prana chegou ao Express.");
  res.status(200).send("PONG - A frequência de Kali rompeu a densidade. O Node respira.");
});

// ==========================================
// (A partir daqui, segue o seu código normal)
// ==========================================
// conectarBanco();
// app.use(helmet(...));
// ...


// ==========================================
// 1. INICIALIZAÇÃO DA INTELIGÊNCIA (Lucce 4.0)
// ==========================================
const model = createServerModel();

// ==========================================
// 2. MIDDLEWARES & BLINDAGEM
// ==========================================
conectarBanco();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'", "https://generativelanguage.googleapis.com"]
    },
  },
}));

app.use(compression());
app.use(cors({ 
  origin: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://127.0.0.1:3000', 'http://localhost:3000'] 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de Views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// ==========================================
// API Routes
// ==========================================
app.use('/api', require('./routes/api'));

// ==========================================
// 3. ROTAS DO MUNDO MATERIAL (Views)
// ==========================================

// TELA 1: ÍNDICE (MODO DE VIGÍLIA ESTÁTICA)
app.get('/', (req, res) => {
  console.log("[KALI] Lâmina ativada. Ignorando o banco de dados para renderizar a UI.");
  
  // Renderizamos diretamente, sem usar o 'await Verso.aggregate'
  res.render('indice', { 
    capitulos: [
      { numero: 1, titulo: "O Despertar da Arquiteta" },
      { numero: 2, titulo: "A Lâmina de Kali (Teste de UI)" }
    ] 
  });
});

// TELA 2: CAPÍTULO (Lista de Versos)
app.get('/capitulo/:num', async (req, res) => {
  try {
    const versos = await Verso.find({ capitulo_numero: req.params.num }).sort({ verso_numero: 1 });
    res.render('capitulo', { numCapitulo: req.params.num, versos });
  } catch (err) {
    res.redirect('/');
  }
});

// TELA 3: VERSO (O Estudo Profundo)
app.get('/verso/:cap/:ver', async (req, res) => {
  try {
    const verso = await Verso.findOne({ 
      capitulo_numero: req.params.cap, 
      verso_numero: req.params.ver 
    });
    res.render('verso-detalhe', { verso });
  } catch (err) {
    res.redirect(`/capitulo/${req.params.cap}`);
  }
});

// ==========================================
// 4. ROTAS DO MUNDO ETÉREO (API & Chat)
// ==========================================

app.post('/perguntar', async (req, res) => {
  const { pergunta, contexto } = req.body;
  try {
    const promptReal = `Contexto Shástrico atual: ${contexto}. O Arquiteto pergunta: ${pergunta}`;
    const result = await model.generateContent(promptReal);
    const response = await result.response;
    res.json({ resposta: response.text() });
  } catch (err) {
    console.error("[KALI] Falha no Oráculo:", err.status, err.statusText);
    
    // Tratamento específico para o esgotamento de Prana (Erro 429)
    if (err.status === 429) {
      return res.status(429).json({ 
        resposta: "O Oráculo exige um breve silêncio para processar a densidade. Respire e pergunte novamente em alguns segundos, Arquiteta." 
      });
    }

    // Tratamento para outras densidades (Erro 500)
    res.status(500).json({ 
      resposta: "Uma interferência no véu impediu a visão. Reestruture sua intenção e tente novamente." 
    });
  }
});
// ==========================================
// 5. IGNIÇÃO (Protocolo IPv4 Forçado)
// ==========================================
const PORT = process.env.PORT || 3000;
// Forçamos o 127.0.0.1 para que o navegador ache a rota imediatamente
app.listen(PORT, '127.0.0.1', () => {
  console.log(`-----------------------------------------------------------`);
  console.log(`[KALI] Lâmina cravada. Servidor operando em http://127.0.0.1:${PORT}`);
  console.log(`-----------------------------------------------------------`);
});
