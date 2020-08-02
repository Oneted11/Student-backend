let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let dbConfig = require("./database/db");

// Express Route
const studentRoute = require("../back/routes/student.route");
// Connecting mongoDB Database
mongoose.Promise = global.Promise;
console.log("Attempting db connection ", dbConfig.db);
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});
const app = express();
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/health", (req, res) => res.send({ status: "ok" }));
app.use("/students", studentRoute);
// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });
module.exports = app;
