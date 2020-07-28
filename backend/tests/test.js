const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
const userData = {
  username: "piacere",
  password: "conoscerla",
  passwordCheck: "conoscerla",
};

const loginData = {
  username: "ipsum",
  password: "fantastic",
};
describe("Testing and shieeet", function () {
  after(() => {});

  var url = "http://localhost:4000";
  var requester = chai.request.agent(url);

  it("register a user", function (done) {
    requester
      .post("/register")
      .send(userData)
      .then(function (res) {
        expect.res.to.have.status(200);
      });
  });

  it("logging in a user", function (done) {
    requester
      .post("/login")
      .send(loginData)
      .then(function (res) {
        expect.res.to.have.status(200);
      });
  });
});
