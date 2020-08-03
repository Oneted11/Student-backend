let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let dbConfig = require("./database/db");

// Express Route
const studentRoute = require("./routes/student.route");

// var corsOptions = {
//   origin: Access-Control-Allow-Origin: *"https://student-end-front.herokuapp.com/student-list",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
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
// app.options('*', cors())
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}
app.use(cors("Access-Control-Allow-Origin", '*'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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
