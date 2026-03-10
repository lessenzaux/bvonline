const mongoose = require('mongoose');

const conectarBanco = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/santuario';
    await mongoose.connect(uri);
    console.log('[KALI] Conexão com o MongoDB estabelecida. Prana fluindo.');
    
    // Handle connection events for graceful shutdown
    mongoose.connection.on('error', (err) => {
      console.error('[KALI] Erro na conexão MongoDB:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('[KALI] Conexão MongoDB perdida. Tentando reconectar...');
    });
    
  } catch (err) {
    console.error('[KALI] Erro ao conectar ao MongoDB:', err.message);
    // Don't exit - let the app run and handle the error gracefully
    console.warn('[KALI] O servidor continuará funcionando sem banco de dados.');
  }
};

module.exports = conectarBanco;