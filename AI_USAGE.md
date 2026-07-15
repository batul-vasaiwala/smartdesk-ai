# AI Usage Report

## AI Tools Used

The following AI tools were used during the development of this project:

- ChatGPT (OpenAI) – Used for brainstorming, debugging, architecture guidance, documentation, and code improvements.
- Groq API (Llama 3.3 70B Versatile) – Used inside the application to analyze support tickets by predicting category, priority, sentiment, and generating customer replies.
- v0 - Used for designing UI of the application

---

## Example Prompts

### Prompt 1

> Design a full-stack AI-powered customer support ticket management system using React, Node.js, Express, and MongoDB.

This helped define the overall project architecture and folder structure.

---

### Prompt 2

> Generate an AI prompt that classifies a customer support ticket into category, priority, sentiment, and returns a professional reply in JSON format.

This prompt was used for integrating the Groq LLM into the backend.

---

### Prompt 3

> Help build a responsive React dashboard with ticket statistics, search, filtering, sorting, ticket details, and status tracking.

This assisted in designing the frontend dashboard and improving user experience.

---

## Issues Encountered

### 1. Invalid Gemini API Key

Initially, the project used Google's Gemini API. During development the API key repeatedly returned authentication errors.

**Fix**

The AI provider was switched to Groq (Llama 3.3 70B), which provided a stable API and required minimal backend changes.

---

### 2. LLM Response Formatting

Occasionally the LLM returned JSON wrapped inside Markdown code blocks.

Example:

```json
{
  "category":"Billing"
}
```

This caused JSON parsing errors.

**Fix**

A dedicated parser (`parseAIResponse.js`) was created to remove Markdown formatting before parsing the JSON.

---

### 3. Frontend Integration

During integration there were mismatches between backend API responses and frontend expectations.

**Fix**

The frontend service layer was updated to correctly access nested response data (`response.data.data`).

---

## AI Contribution Estimate

Approximately:

- AI-assisted code: **60%**
- Hand-written, modified, integrated and debugged code: **40%**

AI was primarily used for guidance, boilerplate generation, debugging suggestions, and documentation. Final implementation, integration, testing, and project customization were completed manually.