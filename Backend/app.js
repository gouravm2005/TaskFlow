import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './Routes/authRoutes.js'
import taskRoute from './Routes/taskRoutes.js'
import categoryRoute from './Routes/categoryRoutes.js'
import dashboardRoute from './Routes/dashboardRoutes.js'
import noteRoute from './Routes/noteRoutes.js'

dotenv.config()

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/task', taskRoute);
app.use('/api/category', categoryRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/note', noteRoute);
app.use('/',(req, res) => res.send("Hello"));

export default app;
