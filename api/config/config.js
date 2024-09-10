module.exports = {
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "myuser",
    password: process.env.DB_PASSWORD || "mysecretpassword",
    database: process.env.DB_NAME || "mssqldb",
    dialect: process.env.DB_ENGINE || "postgresql",
    port: process.env.DB_PORT || 1433
  };