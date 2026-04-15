# Priva-sync-Recruitment-Task
This is a full-stack chatbot application only accessible to authorized users.

## Tech Stack
1. **Frontend:** React (Vite), React router, Axios
2. **Backend:** Node.js, Express.js
3. **Database:** MongoDB (Atlas)
4. **Authentication:** JWT (JSON Web Tokens), bycryptjs
5. **AI:** Groq API (LLaMA 3.3 70B)
<<<<<<< HEAD
=======
6. **Containerization:** Docker
>>>>>>> 16e5f7d (add: updated README, added docker configuration)

## Features
1. User Signup and Login
2. JWT-based authentication
3. Protected chat route: only logged-in users can access the chatbot
4. Real-time AI responses using Groq API
5. Passwords are hased before storing in DB
6. CORS configured fror frontend communication
7. Docker use to contain the app.

## Setup Instructions

### Prerequisites
1. Node.js
2. MongoDB Atlas account
3. Groq API key

### Backend Setup
1. Navigate to the backend folder:
*cd backend*
2. Install dependencies:
*npm install*
3. Create a '.env' file with MONGO_URI, JWT_SECRET_KEY, PORT and GROQ_API_KEY

4. Start the server:
*npm run dev*

### Frontend Setup
1. Navigate to the frontend folder:
*cd frontend*
2. Install dependencies:
*npm install*
3. Start the development server:
*npm run dev*
4. Open the loaded link in your browser

## API Endpoints

1. POST /api/auth/signup - Register a new user (no auth required)
2. POST /api/auth/login - Login and get JWT token (no auth required)
3. POST /api/chat - Send message to AI (auth required)

## How Authentication Works
1. User signs up and password is hashed and stored in MongoDB
2. User logs in and receives a JWT token
3. Token is stored in localStorage on the frontend
4. Every chat request sends the token in the Authorization header
5. Backend middleware verifies the token before allowing access
<<<<<<< HEAD
=======

## To run on Docker

1. Ensure you have Docker and Docker Compose installed.
2. Add your environment variables to `./backend/.env`.
3. Run the following command in the root directory: *docker-compose up --build*
4. Frontend: http://localhost:5173
5. Backend: http://localhost:5000
>>>>>>> 16e5f7d (add: updated README, added docker configuration)
