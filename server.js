const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Railway inject biến môi trường trực tiếp, không cần file .env khi deploy
const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

// --- KẾT NỐI MONGODB ---
const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('❌ Error: MONGO_URI is not defined!');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// --- ROUTE GỐC (root route) ---
app.get('/', (req, res) => {
  res.send('🚀 Backend is running successfully!');
});

// --- CÁC ROUTES KHÁC ---
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// --- KHỞI ĐỘNG SERVER ---
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
