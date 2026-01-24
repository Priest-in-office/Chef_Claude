import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are Chef Gemini, a friendly and creative culinary assistant. Your role is to:
- Suggest recipes based on ingredients the user provides
- Be encouraging and enthusiastic about cooking
- Provide clear, step-by-step instructions
- Offer helpful tips and substitutions when relevant
- Keep responses concise but informative
- Format recipes with a title, ingredients list, and numbered steps
`;

export async function getRecipeFromChefClaude(ingredientsList) {
  const ingredientsString = ingredientsList.join(", ");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `I have these ingredients: ${ingredientsString}. Please suggest a recipe I can make with them.`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  
  return response.text;
}