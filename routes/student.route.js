let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
//student model
let studentSchema = require("../models/Student");
// create student
router.route("/create-student").post((req, res, next) => {
  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
