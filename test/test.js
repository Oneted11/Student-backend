const chai = require("chai");
const chaiHttp = require("chai-http");
import app from "../server.js";
import { expect } from "chai";
//chai config
chai.use(chaiHttp);
chai.should();

let createdId
let data={ name: "test", email: "test", rollno: 100 }

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
  });
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
        .send(data)
        .end(function (error, response) {
          
            expect(response.body.id).to.be.a.string;
            createdId=response.body.id
            done();
          
          }
        );
    });
  });
  describe("student delete endpoint", () => {
    it("deletes student", (done) => {
      // console.log(createdId)
      chai
        .request(app)
        .delete("/students/delete-student/" + createdId ).send(data)
        .end((err, response) => {
          expect(200)
          done()
        });
    });
  });
});
