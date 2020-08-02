var db;

if (process.env.NODE_ENV == "production") {
  db =
    "mongodb+srv://ted:ted@cluster0-ocswh.mongodb.net/<dbname>?retryWrites=true&w=majority";
} else {
  db = "mongodb://localhost:27017/myproject";
}

module.exports = {
  db,
};
