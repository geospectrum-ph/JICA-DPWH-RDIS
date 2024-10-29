const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const { verifyToken, checkRole } = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

// apply checkRole for role specific routes
app.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'This is an admin-only route' });
});

app.get('/', (req, res) => {
  res.status(200).json({status: true, message: 'Server is running.'});
});


const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});