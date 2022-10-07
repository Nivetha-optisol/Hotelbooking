"use strict";
exports.__esModule = true;
require("mocha");
var sinon = require("sinon");
var hotel_1 = require("../controllers/hotel");
var myObj = new hotel_1.hotel();
describe("hotel Controller _test", function () {
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
    it("Must get all hotels", function () {
        var spy = sinon.spy(myObj, "gethotel");
        myObj.gethotel(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("Must create hotels", function () {
        var spy = sinon.spy(myObj, "createHotel");
        myObj.createHotel(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("update hotels", function () {
        var spy = sinon.spy(myObj, "updateHotel");
        myObj.updateHotel(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("delete hotels", function () {
        var spy = sinon.spy(myObj, "deleteHotel");
        myObj.deleteHotel(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("  get hotels by id", function () {
        var spy = sinon.spy(myObj, "gethotelbyid");
        myObj.gethotelbyid(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it(" getHotelRooms", function () {
        var spy = sinon.spy(myObj, "getHotelRooms");
        myObj.getHotelRooms(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it(" getRating", function () {
        var spy = sinon.spy(myObj, "getRating");
        myObj.getRating(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it(" setRating", function () {
        var spy = sinon.spy(myObj, "setRating");
        myObj.setRating(req, res, next);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unithotel.js.map