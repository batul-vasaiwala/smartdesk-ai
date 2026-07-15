export function parseAIResponse(text) {
  // Remove markdown code fences
  text = text.replace(/```json/g, "");
  text = text.replace(/```/g, "");
  text = text.trim();

  return JSON.parse(text);
}