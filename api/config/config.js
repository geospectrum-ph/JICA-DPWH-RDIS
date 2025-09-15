module.exports = {
    host: process.env.DB_HOST || "192.168.1.114",
    username: process.env.DB_USER || "rdis_user",
    password: process.env.DB_PASSWORD || "geospectrum804_dpwhjica!",
    database: process.env.DB_NAME || "RDIS_test",
    dialect: process.env.DB_ENGINE || "mssql",
    port: process.env.DB_PORT || 1433
  };