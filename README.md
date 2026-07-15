# SmartDesk AI

SmartDesk AI is an AI-powered customer support ticket management system that automatically analyzes customer tickets using LLMs. It classifies tickets into categories, predicts priority and sentiment, and generates an AI-assisted reply to help support agents respond faster.

---

## Features

### Customer Portal
- Create support tickets
- Track ticket status

### Agent Dashboard
- View all tickets
- Search tickets
- Filter by category and status
- Sort by newest/oldest
- View ticket details
- Edit AI reply
- Approve AI reply
- Resolve tickets
- Delete tickets
- Dashboard statistics

### AI Features
- Automatic ticket categorization
- Priority prediction
- Sentiment analysis
- AI-generated customer reply

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Groq API (Llama 3.3 70B)

---

## Folder Structure

```
smartdesk-ai/

├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── tests/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
```

---

## Installation

### Clone repository

```bash
git clone https://github.com/batul-vasaiwala/smartdesk-ai.git

cd smartdesk-ai
```

### Backend

```bash
cd backend

npm install
```

### Frontend

```bash
cd frontend

npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection

GROQ_API_KEY=your_groq_api_key
```

---

## Running the Project

Backend

```bash
cd backend

npm run dev
```

Frontend

```bash
cd frontend

npm run dev
```

---

## Running Tests

```bash
cd backend

npm test
```

---

## API Endpoints

### Ticket APIs

POST /api/tickets

GET /api/tickets

GET /api/tickets/:id

PUT /api/tickets/:id

PATCH /api/tickets/:id/resolve

DELETE /api/tickets/:id

GET /api/tickets/stats

---

## Future Improvements

- Authentication
- Email notifications
- Real-time updates using Socket.io
- Role-based access

---

## Demo

Not deployed.
