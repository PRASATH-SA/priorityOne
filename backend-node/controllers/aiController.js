const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini - will use API key if present, otherwise mock
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!genAI) {
      // Mock response if no API key
      return res.json({ 
        reply: `(Mock Gemini AI): I received your message "${message}". Please add GEMINI_API_KEY to .env to use the real AI.`
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "Sorry, I encountered an error processing your request." });
  }
};

exports.analyzeComplaint = async (req, res) => {
  try {
    const { complaintText } = req.body;
    
    if (!genAI) {
      return res.json({ 
        category: "General",
        priority: "Medium",
        analysis: "(Mock Analysis) This looks like a standard complaint."
      });
    }

    const prompt = `Analyze this citizen complaint and extract the category, priority (High/Medium/Low), and a short 1-sentence analysis. Complaint: "${complaintText}". Return as JSON with keys: category, priority, analysis.`;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Parse the JSON (assuming the model returns it cleanly)
    try {
      const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, ''));
      res.json(parsed);
    } catch(e) {
      res.json({ category: "Unknown", priority: "Medium", analysis: text });
    }
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
};
