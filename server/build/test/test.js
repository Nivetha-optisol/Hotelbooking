"use strict";
exports.__esModule = true;
var chai = require("chai");
// let server = require("../src/index")
var chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
describe("Test Api", function () {
    describe("GET/api/hotels", function () {
        it("it Should get all the tasks", function (done) {
            chai.request("http://localhost:8005")
                .get("/api/hotels")
                .end(function (err, response) {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
        });
    });
});
//# sourceMappingURL=test.js.map