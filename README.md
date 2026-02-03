# Feedback Widget

A full‑stack feedback collection app with a simple frontend form and an admin dashboard to view submissions.  
Built with **React + Vite (frontend)** and **Node.js + Express + MongoDB (backend)**.  
Deployed on **Netlify (frontend)** and **Railway (backend)**.

---

## 🚀 Live URLs
- **Frontend (Netlify):** https://glittery-concha-73fd19.netlify.app/
- **Backend (Railway):** https://feedback-widget-production-9350.up.railway.app/

---

## 🛠 Tech Stack
- **Frontend:** React, Vite, Axios, TailwindCSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Deployment:** Netlify (frontend), Railway (backend)
- **Version Control:** GitHub

- ## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd feedback-widget
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   # Create .env file with VITE_API_BASE_URL=http://localhost:3001
   npm run dev
   ```

### Environment Variables

**Backend (.env):**
```
PORT=3001
DATABASE_URL=mongodb://localhost:27017/feedback
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/feedback
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3001
```

### API Endpoints

- **POST /api/feedback** - Submit feedback
- **GET /api/feedback** - Get all feedback

### Testing

Use Postman or curl to test the API:

```bash
# Submit feedback
curl -X POST http://localhost:3001/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Great!"}'

# Get all feedback
curl http://localhost:3001/api/feedback
```

