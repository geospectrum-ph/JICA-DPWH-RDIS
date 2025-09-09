require("dotenv").config();
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const { verifyToken, checkRole } = require('./middleware/auth');
const sql = require("mssql");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql
  .connect(dbConfig)
  .then((pool) => {
    if (pool.connected) {
      console.log("Connected to the MSSQL database.");

      try {

        app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "http://localhost:1443"); // update to match the domain you will make the request from
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });

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

      } catch (err) {
        console.error("Error setting up routes:", err);
      }

      app.listen(PORT, () => {
        console.log(`The server is running on port: ${PORT}.`);
      });
    }
  })
  .catch((err) => {
    console.error("Error connecting to MSSQL:", err);
  });







