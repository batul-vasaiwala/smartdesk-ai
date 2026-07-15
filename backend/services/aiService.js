import dotenv from "dotenv";
import { parseAIResponse } from "../utils/parseAIResponse.js";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
export const analyzeTicket = async (subject, message) => {
  const prompt = `
You are an AI customer support assistant.

Analyze this support ticket.

Subject:
${subject}

Message:
${message}

Return ONLY valid JSON in this exact format:

{
  "category":"Billing | Technical | Shipping | Account | General",
  "priority":"Low | Medium | High",
  "sentiment":"Positive | Neutral | Negative",
  "reply":"Professional reply to the customer"
}

Do not include markdown.
Do not include explanation.
Only return JSON.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let text = completion.choices[0].message.content.trim();

    // Remove markdown if present
   return parseAIResponse(text);
  } catch (error) {
    console.error("Groq Error:", error);

    return {
      category: "General",
      priority: "Medium",
      sentiment: "Neutral",
      reply:
        "Thank you for contacting us. Our support team will review your request shortly.",
    };
  }
};