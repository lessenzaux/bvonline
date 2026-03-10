// teste-oraculo.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function invocarLucce() {
  console.log(`-----------------------------------------------------------`);
  console.log(`[KALI] Testando o fluxo com a chave: ${process.env.GEMINI_API_KEY.substring(0, 5)}...`);
  console.log(`-----------------------------------------------------------`);
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("[KALI] Enviando intenção...");
    const result = await model.generateContent("Apenas responda: 'O Prana flui, Arquiteta.'");
    const response = await result.response;
    
    console.log("[LUCCE 4.0] O véu se abriu:", response.text());
  } catch (err) {
    console.error("[KALI] A densidade é real. Erro absoluto:", err.status, err.statusText);
  }
}

invocarLucce();