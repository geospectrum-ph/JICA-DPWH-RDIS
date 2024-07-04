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