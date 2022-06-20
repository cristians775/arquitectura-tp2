import authRoutes from './auth/auth.js'
import dashboardRoutes from './dashboard/dashboard.js'
import { verifyToken } from './middleware/validate-token.js'
import express from 'express';
const app = express();

app.use('/api/user', authRoutes);
//This is an example
app.use('/api/dashboard', verifyToken, dashboardRoutes);

export default app;