# 🎓 AI Education Platform (EduAI)

A modern, interactive e-learning platform connecting students with instructors and AI-powered tutoring.

![Platform Preview](https://via.placeholder.com/800x400?text=EduAI+Platform+Preview)

## 🚀 Features

-   **Authentication**: Secure Login & Registration with JWT.
-   **Interactive Dashboard**: Real-time overview of courses and progress.
-   **Community Chat**: Live public chat room for students and teachers.
-   **AI Tutor**: Personal AI learning assistant (OpenAI integration).
-   **Course Management**: Browse and enroll in interactive courses.
-   **Responsive Design**: Mobile-friendly interface built with Tailwind CSS.

## 🛠️ Technology Stack

-   **Frontend**: React, Vite, Tailwind CSS v4, Lucide React
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL (with automatic Mock Mode fallback)
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs
-   **AI**: OpenAI API

## 📦 Installation & Setup

### Prerequisites
-   Node.js (v14+)
-   PostgreSQL (Optional - App runs in Mock Mode without it)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/eduai-platform.git
cd eduai-platform
```

### 2. Backend Setup
```bash
cd server
npm install
```

**Configuration:**
Create a `.env` file in the `server` directory (copy from `.env.example`):
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/tutor_db
JWT_SECRET=your_super_secret_key
OPENAI_API_KEY=your_openai_key
```

**Database Initialization:**
```bash
# If you have PostgreSQL running:
node setupDb.js
```

**Start the Server:**
```bash
node index.js
```
*The server runs on http://localhost:5000*

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*The app runs on http://localhost:5173*

## 🧪 Error Handling & Fallbacks

-   **Database**: If PostgreSQL is unreachable, the app automatically switches to **Mock Mode**, using in-memory data for demonstration.
-   **Authentication**: Robust validation and error messaging for login/signup flows.
-   **API**: Global error handling middleware ensures graceful failure responses.

## 📂 Project Structure

```
/client       # React Frontend
  /src
    /components  # Reusable UI components
    /pages       # Route components
    /context     # Global state (Auth)
    
/server       # Node.js Backend
  /routes     # API Endpoints
  /middleware # Error handling & Auth
  /db.js      # Database connection & Mock logic
```

## 📜 License

This project is licensed under the MIT License.
