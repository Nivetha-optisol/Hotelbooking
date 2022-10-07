"use strict";
exports.__esModule = true;
require("mocha");
var sinon = require("sinon");
var user_1 = require("../controllers/user");
var myObj = new user_1.users();
describe("user Controller _test", function () {
    var req = {
        body: {},
        params: {},
        headers: {}
    };
    var res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
    };
    var next = function () { };
    it("getUsers", function () {
        var spy = sinon.spy(myObj, "getUsers");
        myObj.getUsers(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("deleteUser", function () {
        var spy = sinon.spy(myObj, "deleteUser");
        myObj.deleteUser(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getUserbyid", function () {
        var spy = sinon.spy(myObj, "getUserbyid");
        myObj.getUserbyid(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("updateUser", function () {
        var spy = sinon.spy(myObj, "updateUser");
        myObj.updateUser(req, res, next);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unituser.js.map