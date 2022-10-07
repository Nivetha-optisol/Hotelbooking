"use strict";
exports.__esModule = true;
require("mocha");
var sinon = require("sinon");
var auth_1 = require("../controllers/auth");
var myObj = new (auth_1.Authentication);
describe("Auth Controller _test", function () {
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
    it(" GoogleSignIn", function () {
        var spy = sinon.spy(myObj, "GoogleSignIn");
        myObj.GoogleSignIn(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("changePassword", function () {
        var spy = sinon.spy(myObj, "changePassword");
        myObj.changePassword(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("emailVerified", function () {
        var spy = sinon.spy(myObj, "emailVerified");
        myObj.emailVerified(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("register", function () {
        var spy = sinon.spy(myObj, "register");
        myObj.register(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("login", function () {
        var spy = sinon.spy(myObj, "login");
        myObj.login(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("verifyPasswordMail", function () {
        var spy = sinon.spy(myObj, "verifyPasswordMail");
        myObj.verifyPasswordMail(req, res);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unitauth.js.map