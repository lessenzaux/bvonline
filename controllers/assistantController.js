const { createChatModel } = require('../config/ai');

exports.consultarOraculo = async (req, res) => {
  try {
    const { pensamentoAtual } = req.body;

    if (!pensamentoAtual) {
      return res.status(400).json({ erro: "O vazio não pode ser analisado. Forneça um pensamento." });
    }

    // Instanciamos o modelo com a doutrina de Lucce
    const model = createChatModel();

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "O usuário abriu o oráculo." }],
        },
        {
          role: "model",
          parts: [{ text: "A densidade se dissipa. A forma segue o fluxo orgânico. Bem-vindo à essência do Web UX. O que deseja destilar?" }],
        }
      ],
      generationConfig: {
        maxOutputTokens: 300, 
        temperature: 0.4,     
      },
    });

    const result = await chat.sendMessage(pensamentoAtual);
    const respostaLucce = result.response.text();

    res.status(200).json({ 
      sucesso: true, 
      insight: respostaLucce 
    });

  } catch (error) {
    console.error(`[Lucce 4.0 - Falha Neural]: ${error.message}`);
    res.status(500).json({ erro: "A conexão com o éter falhou. Verifique sua GEMINI_API_KEY no arquivo .env." });
  }
};