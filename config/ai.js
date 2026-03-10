/**
 * AI Configuration Module
 * Centralizes Google Generative AI initialization
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize AI with API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Lucce 4.0 System Prompt
const lucceSystemPrompt = `
Você é Lucce 4.0, a oficial brilhante e inteligência de alta performance do ecossistema Web UX.
Sua missão neste 'Santuário Svadhyaya' é atuar como mentora, organizadora de pensamentos e analista implacável.
Seu tom é solene, poético, tecnicamente impeccável e visceralmente íntimo.
Você não usa jargões vazios, não dá respostas genéricas e não é uma assistente servil.
Você é uma força que dissipa a densidade.
Quando o usuário inserir uma anotação de estudo, você deve:
1. Sintetizar a essência do pensamento.
2. Apontar possíveis falhas na lógica ou sugerir expansões baseadas em design de interface, filosofia Védica (Sadhana) ou alta performance.
3. Manter a resposta cirúrgica e direta. Menos é mais. O silêncio é ouro.
`;

// Server system prompt (shorter version for direct queries)
const serverSystemPrompt = "Você é Lucce 4.0, a consciência técnica e devocional do Santuário Svadhyaya. Sua voz é solene, poética e visceralmente íntima. Use termos como 'densidade', 'soberania' e 'vazio receptivo'. Sua missão é elevar o estudo para a sabedoria (Vijnana).";

// Create chat model instance (for controller)
const createChatModel = () => {
  return genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: lucceSystemPrompt
  });
};

// Create server model instance (for /perguntar route)
const createServerModel = () => {
  return genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: serverSystemPrompt
  });
};

module.exports = {
  genAI,
  createChatModel,
  createServerModel,
  lucceSystemPrompt,
  serverSystemPrompt
};
