const express = require('express');
const app = express();

app.use(express.json());

// sync tables
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/userRoutes")(app);
app.use('/', (req, res, next) => {
  res.status(200).json({status: true, message: 'Server is running.'});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const express = require('express');
// const sequelize = require('./models');
// const userController = require('./controllers/userController');

// const app = express();
// app.use(express.json());

// // Routes
// app.post('/register', userController.register);
// app.post('/login', userController.login);

// // Protected route example
// app.get('/profile', userController.verifyToken, (req, res) => {
//   res.json({ message: 'Access to protected route', user: req.user });
// });

// // Initialize database and start server
// async function startServer() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//     await sequelize.sync();
//     console.log('Database synchronized');
    
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// startServer();