const chai = require("chai");
const chaiHttp = require("chai-http");
import app from "../server.js";
import { expect } from "chai";
//chai config
chai.use(chaiHttp);
chai.should();

describe("setup", () => {
  //wait time for db connections
  before(function (done) {
    this.timeout(1000); // wait for db connections etc.

    setTimeout(done, 500);
  });
  describe("Health ", () => {
    it("Statuscode 200", (done) => {
      chai
        .request(app)
        .get("/health")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  })
  describe("get students endpoint ", () => {
    it("should return statuscode 200", (done) => {
      chai
        .request(app)
        .get("/students/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should return a list of students", (done) => {
      chai
        .request(app)
        .get("/students/")
        .end((err, res) => {
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("student post endpoint", () => {
    it("creates student", (done) => {
      chai
        .request(app)
        .post("/students/create-student")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ name: "test", email: "test", rollno: 100 })
        .end(function (error, response) {
          if (error) {
            expect(response.body.id).to.be.a.string;
            done(error);
          } else {
            done();
          }
        });
    });
  });
});
