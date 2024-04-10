const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Import your Express application

// Tell Chai to use the chaiHttp plugin
chai.use(chaiHttp);

const expect = chai.expect;

// Write test cases
describe("API Testing", () => {
  // Test for GET request
  describe("GET Request Testing", () => {
    it("should return 200 status code and correct response", (done) => {
      chai
        .request(app)
        .get("/task/get")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  // Test for POST request
  describe("POST Request Testing", () => {
    it("should create a new task", (done) => {
      chai
        .request(app)
        .post("/api/tasks")
        .send({ title: "Test Task", description: "This is a test task" })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("id");
          done();
        });
    });
  });
});
