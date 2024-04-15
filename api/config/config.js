module.exports = {
    HOST: process.env.PGHOST || "localhost",
    USER: process.env.PGUSER || "myuser",
    PASSWORD: process.env.PGPASSWORD || "mysecretpassword",
    DB: process.env.PGDATABASE || "postgres",
    dialect: "postgresql",
  };