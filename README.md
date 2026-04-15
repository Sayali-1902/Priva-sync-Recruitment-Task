# Priva-sync-Recruitment-Task
This is a full-stack chatbot application only accessible to authorized users.

## Tech Stack
1. Frontend: React (Vite), React router, Axios
2. Backend: Node.js, Express.js
3. Database: MongoDB (Atlas)
4. Authentication: JWT (JSON Web Tokens), bycryptjs
5. AI: Groq API(LLaMA 3.3 70B)

## Features
1. User Signup and Login
2. JWT-based authentication
3. Protected chat route: only logged-in users can access the chatbot
4. Real-time AI responses using Groq API
5. Passwords are hased before storing in DB
6. CORS configured fror frontend communication

## Setup Instructions

### Prerequisites
1. Node.js
2. MongoDB Atlas account
3. Groq API key

### Backend Setup
1. Navigate to the backend folder:
cd backend
2. Install dependencies:
npm install
3. Create a '.env' file with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
GROQ_API_KEY=your_groq_api_key

4. Start the server:
npm run dev

### Frontend Setup
1. Navigate to the frontend folder:
cd frontend
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Open the loaded link in your browser

## API Endpoints

| Method | Endpoint         | Description              | Auth Required |
| POST   | /api/auth/signup | Register a new user      | No            |
| POST   | /api/auth/login  | Login and get JWT token  | No            |
| POST   | /api/chat        | Send a message to the AI | Yes           |
