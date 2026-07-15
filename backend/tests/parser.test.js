import { parseAIResponse } from "../utils/parseAIResponse.js";

describe("LLM Output Parser", () => {

  test("should parse Gemini/Groq JSON response", () => {

    const response = `
\`\`\`json
{
  "category":"Billing",
  "priority":"High",
  "sentiment":"Negative",
  "reply":"Refund will be processed."
}
\`\`\`
`;

    const result = parseAIResponse(response);

    expect(result.category).toBe("Billing");
    expect(result.priority).toBe("High");
    expect(result.sentiment).toBe("Negative");
    expect(result.reply).toBe("Refund will be processed.");

  });

});