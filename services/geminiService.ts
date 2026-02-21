
import { GoogleGenAI } from "@google/genai";
import { Profile } from "../types";

// Always use the process.env.API_KEY directly for initialization as per Google GenAI SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDivineInsight = async (user1: Profile, user2: Profile) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise a afinidade entre dois solteiros cristãos para o "Conexão Divina".
      Pessoa 1: ${user1.name}, ${user1.age} anos, Igreja: ${user1.churchName} (${user1.denomination}), Altura: ${user1.physical?.height}cm, Cabelo: ${user1.physical?.hairColor}, Bio: ${user1.bio}.
      Pessoa 2: ${user2.name}, ${user2.age} anos, Igreja: ${user2.churchName} (${user2.denomination}), Altura: ${user2.physical?.height}cm, Cabelo: ${user2.physical?.hairColor}, Bio: ${user2.bio}.
      
      Dê um "Discernimento Pastoral" sobre essa conexão, citando como a proximidade física e eclesiástica pode facilitar o convívio, em até 3 frases. Seja elegante e encorajador.`,
    });

    // Directly accessing the .text property from GenerateContentResponse as per guidelines
    return response.text;
  } catch (error) {
    return "O amor é o vínculo da perfeição. Esta conexão tem um belo potencial espiritual!";
  }
};
