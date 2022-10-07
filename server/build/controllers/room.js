"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.crudroom = void 0;
var Room_1 = require("../models/Room");
var Hotel_1 = require("../models/Hotel");
// *******************************************************************  CRUD CODE FOR ROOM******************************************************
var crudroom = /** @class */ (function () {
    function crudroom() {
        var _this = this;
        // CREATING A ROOM 
        this.createRoom = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var hotelId, newRoom, savedRoom, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hotelId = req.params.hotelid;
                        newRoom = new Room_1["default"](req.body);
                        console.log(newRoom);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, newRoom.save()];
                    case 2:
                        savedRoom = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, Hotel_1["default"].findByIdAndUpdate(hotelId, {
                                $push: { rooms: savedRoom._id }
                            })];
                    case 4:
                        _a.sent();
                        console.log("hiiiiiiiiiiiii");
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(err_1)];
                    case 6:
                        res.status(200).json(savedRoom);
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        // UPDATING A ROOM
        this.updateRoom = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var updateRoom, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Room_1["default"].findByIdAndUpdate(req.params.id, { $set: req.body }, { "new": true })];
                    case 1:
                        updateRoom = _a.sent();
                        res.status(200).json(updateRoom);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // updating Available rooms
        this.updateRoomAvailability = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Room_1["default"].updateOne({ "roomNumbers._id": req.params.id }, {
                                $push: {
                                    "roomNumbers.$.unavailableDates": req.body.dates
                                }
                            })];
                    case 1:
                        _a.sent();
                        res.status(200).json("Room status has been updated.");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        next(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // DELETING A ROOM
        this.deleteRoom = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var roomId, hotel, hotelId, err_5, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roomId = req.params.id;
                        return [4 /*yield*/, Hotel_1["default"].find({
                                rooms: { $in: roomId }
                            })];
                    case 1:
                        hotel = _a.sent();
                        console.log(hotel);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 11, , 12]);
                        if (!(hotel.length > 0)) return [3 /*break*/, 8];
                        hotelId = hotel[0]._id;
                        return [4 /*yield*/, Room_1["default"].findByIdAndDelete(roomId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, Hotel_1["default"].findByIdAndUpdate(hotelId, {
                                $pull: { rooms: roomId }
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        next(err_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, res.status(200).json("Room has been deleted.")];
                    case 8: return [4 /*yield*/, Room_1["default"].findByIdAndDelete(roomId)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json("Room has been deleted.")];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_6 = _a.sent();
                        next(err_6);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        // GET ROOM BY ID
        this.getroombyid = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var room, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Room_1["default"].findById(req.params.id)];
                    case 1:
                        room = _a.sent();
                        res.status(200).json(room);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        res.status(500).json(err_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // GET ALL ROOMS
        this.getroom = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var rooms, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Room_1["default"].find()];
                    case 1:
                        rooms = _a.sent();
                        res.status(200).json(rooms);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _a.sent();
                        //  res.status(500).json(err)
                        next(err_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return crudroom;
}());
exports.crudroom = crudroom;
//# sourceMappingURL=room.js.map