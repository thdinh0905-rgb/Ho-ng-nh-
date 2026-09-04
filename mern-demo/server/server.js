const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Đọc biến môi trường từ file .env ở thư mục gốc (mern-demo/.env)
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Route kiểm tra API Backend (Câu 22)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend Node.js & Express đang hoạt động thành công!' });
});

// Route gốc (Trang chủ)
app.get('/', (req, res) => {
  res.send('API Backend đang chạy!');
});

// GET danh sách sinh viên (Câu 36)
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST thêm sinh viên (Câu 37)
app.post('/api/students', async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.status(201).json(newStudent);
});

// PUT cập nhật sinh viên (Câu 38)
app.put('/api/students/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE xóa sinh viên (Câu 39)
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Da xoa sinh vien' });
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});