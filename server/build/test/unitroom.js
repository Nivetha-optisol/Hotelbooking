"use strict";
exports.__esModule = true;
require("mocha");
var sinon = require("sinon");
var room_1 = require("../controllers/room");
var myObj = new (room_1.crudroom);
describe("room Controller _test", function () {
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
    it("createRoom", function () {
        var spy = sinon.spy(myObj, "createRoom");
        myObj.createRoom(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("deleteRoom", function () {
        var spy = sinon.spy(myObj, "deleteRoom");
        myObj.deleteRoom(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getroom", function () {
        var spy = sinon.spy(myObj, "getroom");
        myObj.getroom(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getroombyid", function () {
        var spy = sinon.spy(myObj, "getroombyid");
        myObj.getroombyid(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("updateRoom", function () {
        var spy = sinon.spy(myObj, "updateRoom");
        myObj.updateRoom(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("updateRoomAvailability", function () {
        var spy = sinon.spy(myObj, "updateRoomAvailability");
        myObj.updateRoomAvailability(req, res, next);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unitroom.js.map