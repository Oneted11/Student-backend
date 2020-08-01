const chai = require("chai");
const chaiHttp = require("chai-http");
import app from "../server.js";
//chai config
chai.use(chaiHttp);
chai.should();

describe("setup", () => {
  //wait time for db connections
  before(function(done) {
    this.timeout(1000); // wait for db connections etc.

    setTimeout(done, 500);
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
  });
});
