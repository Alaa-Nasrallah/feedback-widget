raCreate a `.env` file in the `backend` directory:

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/feedback-widget?retryWrites=true&w=majority
PORT=3001
```
=======
## Environment Variables

### Backend
Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/feedback-widget?retryWrites=true&w=majority
PORT=3001
```

### Frontend
Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

## Deployment

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "New Project" and import your GitHub repo
3. Set the root directory to `frontend`
4. Add environment variable: `VITE_API_BASE_URL` with your backend URL
5. Deploy

### Backend (Railway)
1. Go to [Railway](https://railway.app) and sign up/login
2. Click "New Project" and select "Deploy from GitHub repo"
3. Connect your GitHub repo
4. Set the root directory to `backend`
5. Railway will auto-detect Node.js and set build/start commands
6. Add environment variable: `DATABASE_URL` with your MongoDB connection string
7. Deploy
