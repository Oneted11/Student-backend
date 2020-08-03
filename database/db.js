var db;

const {
  NODE_ENV,
  DB_URL = "mongodb://localhost:27017/myproject",
} = process.env;

module.exports = {
  db:DB_URL,
};
