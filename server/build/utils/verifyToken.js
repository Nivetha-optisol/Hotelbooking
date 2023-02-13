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
exports.visibleuser = exports.visibleroom = exports.visiblepayment = exports.visiblehotel = exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
var jwt = require("jsonwebtoken");
var User_1 = require("../models/User");
var error_1 = require("../utils/error");
var verifyToken = function (req, res, next) {
    var token = req.cookies.access_token;
    if (!token) {
        return next((0, error_1.createError)(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_KEY, function (err, user) {
        if (err)
            return next((0, error_1.createError)(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
var verifyUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // console.log("isAdmin",req.headers.isadmin)
        (0, exports.verifyToken)(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
            var isadmin, _id, userdata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.params.id);
                        isadmin = req.headers.isadmin;
                        _id = JSON.parse(isadmin)._id;
                        console.log("admin", isadmin);
                        return [4 /*yield*/, User_1["default"].findById(_id)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        userdata = _a.sent();
                        console.log("userdata", userdata);
                        if (userdata._id === req.params.id || userdata.isAdmin) {
                            next();
                        }
                        else {
                            return [2 /*return*/, res.json("You are not authorized!")];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.verifyUser = verifyUser;
var verifyAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, exports.verifyToken)(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
            var isadmin;
            return __generator(this, function (_a) {
                console.log(req.params.id);
                isadmin = req.headers.isadmin;
                if (isadmin) {
                    next();
                }
                else {
                    return [2 /*return*/, res.json("You are not authorized!")];
                }
                // if(isadmin){
                //   const _id = JSON.parse(isadmin)._id
                //   const userdata= await (await User.findById(_id))
                //   console.log("userdata" ,userdata);
                // }
                console.log("admin", isadmin);
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.verifyAdmin = verifyAdmin;
var visiblehotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isshow;
    return __generator(this, function (_a) {
        try {
            isshow = process.env.IS_SHOW_HOTEL;
            // console.log( req.headers);
            console.log("query", isshow);
            if (isshow == "true") {
                next();
            }
            else {
                res.status(404).json("404 Error");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
        return [2 /*return*/];
    });
}); };
exports.visiblehotel = visiblehotel;
var visiblepayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isshow;
    return __generator(this, function (_a) {
        try {
            isshow = process.env.IS_SHOW_PAYMENT;
            // console.log( req.headers);
            console.log("query", isshow);
            if (isshow == "true") {
                next();
            }
            else {
                res.status(404).json("404 Error");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
        return [2 /*return*/];
    });
}); };
exports.visiblepayment = visiblepayment;
var visibleroom = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isshow;
    return __generator(this, function (_a) {
        try {
            isshow = process.env.IS_SHOW_ROOM;
            // console.log( req.headers);
            console.log("query", isshow);
            if (isshow == "true") {
                next();
            }
            else {
                res.status(404).json("404 Error");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
        return [2 /*return*/];
    });
}); };
exports.visibleroom = visibleroom;
var visibleuser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isshow;
    return __generator(this, function (_a) {
        try {
            isshow = process.env.IS_SHOW_USER;
            // console.log( req.headers);
            console.log("query", isshow);
            if (isshow == "true") {
                next();
            }
            else {
                res.status(404).json("404 Error");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
        return [2 /*return*/];
    });
}); };
exports.visibleuser = visibleuser;
//# sourceMappingURL=verifyToken.js.map