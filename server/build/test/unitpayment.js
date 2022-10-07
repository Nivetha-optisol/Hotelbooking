"use strict";
exports.__esModule = true;
require("mocha");
var sinon = require("sinon");
var payment_1 = require("../controllers/payment");
var myObj = new payment_1.pay();
describe("payment Controller _test", function () {
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
    it("payment", function () {
        var spy = sinon.spy(myObj, "payment");
        myObj.payment(req, res);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unitpayment.js.map