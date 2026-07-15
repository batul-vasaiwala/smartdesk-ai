# Design Decisions

## Technology Stack

### Frontend

React was selected because it enables reusable components, client-side routing, and fast UI development.

### Backend

Node.js with Express.js was chosen due to its lightweight architecture and seamless integration with JavaScript across the entire application.

### Database

MongoDB was selected because support tickets have a flexible schema and MongoDB integrates well with Mongoose.

### AI Model

Groq (Llama 3.3 70B Versatile) was selected for its fast inference speed, reliable API, and straightforward integration.

---

## Key Trade-offs

### MongoDB vs SQL

MongoDB was preferred because ticket data is semi-structured and can easily accommodate future fields without schema migrations.

### AI-Generated Replies

AI-generated replies improve response speed but still require human review before being sent to customers.

### Simple Architecture

The project focuses on demonstrating AI-assisted customer support rather than implementing enterprise-level features such as authentication or role management.

---

## What I Would Improve With More Time

- User authentication and authorization
- Email notifications
- File attachment support
- Real-time ticket updates using WebSockets
- Admin and agent role management
- Better dashboard analytics
- Docker deployment
- CI/CD pipeline
- Cloud deployment

---

## Known Limitations

- No user authentication.
- AI replies are generated on demand and depend on external API availability.
- File uploads are not supported.
- Customer notifications are not implemented.
- Dashboard is intended for demonstration purposes and not production deployment.