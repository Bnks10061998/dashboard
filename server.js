import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';
import process from 'process';
import User from '../website/src/Models/User.js';
// import Client from './src/Models/Client.js';
// import Project from './src/Models/Project.js';
import authRoutes from "./src/Routes/authRoutes.js";
import workRoutes from './src/Routes/workRoutes.js';
import clientRoutes from "./src/Routes/clientRoutes.js";
import projectRoutes from "./src/Routes/projectRoutes.js";
// import referralRoutes from './src/routes/referralRoutes.js';
// import galleryRoutes from './src/routes/galleryRoutes.js';
// import templateRoutes from './src/routes/templateRoutes.js';
// import invoiceRoutes from './src/routes/invoiceRoutes.js';
// import emailRoutes from './src/routes/email.js';
// import paymentRoutes from './src/routes/paymentRoutes.js';
// import quotationRoutes from './src/routes/quotationRoutes.js';
// import eventRoutes from './src/routes/eventRoutes.js';
// import messageRoutes from './src/routes/messageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('⚡️ User connected:', socket.id);

  // Example socket event handler: broadcast chat message to all clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
app.use('/uploads/templates', express.static(path.join(__dirname, 'uploads/templates')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.dbName })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --------- AUTH ROUTES ---------
// Signup
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '80h' });
    res.status(200).json({ message: '', token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})
// --------- ROUTES IMPORTED FROM SEPARATE FILES ---------
// app.use('/api/invoices', invoiceRoutes);
// app.use('/api/send-email', emailRoutes);
app.use("/api", authRoutes);
app.use('/api/work', workRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
// app.use('/api/referrals', referralRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/templates', templateRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/quotations', quotationRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/messages', messageRoutes); 

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});



// Start server with Socket.IO attached
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
