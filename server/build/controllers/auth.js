"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Authentication = void 0;
var Otp_1 = require("../models/Otp");
var bcrypt = require('bcryptjs');
var User_1 = require("../models/User");
var crypto = require('crypto');
var error_1 = require("../utils/error");
var jwt = require('jsonwebtoken');
// email handler
var nodemailer = require("nodemailer");
//  unique string
var uuidv4 = require("uuid").v4;
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
require("dotenv").config();
// node mailer 
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
    // TESTING 
});
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for Messages");
        console.log("Success");
    }
});
// Authentication for Register
var Authentication = /** @class */ (function () {
    function Authentication() {
        var _this = this;
        this.register = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var errors, existinguser, salt, hash, newUser, mailOptions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, User_1["default"].findOne({ email: req.body.email })];
                    case 2:
                        existinguser = _a.sent();
                        if (existinguser) {
                            return [2 /*return*/, res.status(400).json({ message: "Existing user", isexist: true })];
                        }
                        return [4 /*yield*/, bcrypt.genSaltSync(10)];
                    case 3:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hashSync(req.body.password, salt)];
                    case 4:
                        hash = _a.sent();
                        newUser = new User_1["default"]({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            isAdmin: req.body.isAdmin,
                            img: req.body.img,
                            phone: req.body.phone,
                            city: req.body.city,
                            isVerified: false,
                            emailToken: crypto.randomBytes(64).toString("hex")
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 5:
                        _a.sent();
                        mailOptions = {
                            from: "nivethakumar1298@gmail.com",
                            to: newUser.email,
                            subject: "Verify your email address",
                            html: "<p>Hello ".concat(newUser.username, "! A Message from Hotel booking!.Please Verify your email address to complete the signup process and login to your account</p>\n        \n                    <p>press here <a href=\"http://").concat(req.headers.host, "/api/auth/verify-email?token=").concat(newUser.emailToken, "\"> here</a> to verify your mailId. </p>")
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            console.log("Verification Mail sent");
                            res.status(400).json({ message: "Verification Mail sent" });
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        //Authentication for login
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, isPasswordCorrect, token, _a, password, isAdmin, otherDetails, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, User_1["default"].findOne({ username: req.body.username })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, next((0, error_1.createError)(404, "User not found"))];
                        return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
                    case 2:
                        isPasswordCorrect = _b.sent();
                        if (!isPasswordCorrect)
                            return [2 /*return*/, next((0, error_1.createError)(400, "Wrong password or username"))];
                        token = jwt.sign({
                            id: user._id,
                            isAdmin: user.isAdmin
                        }, process.env.JWT_KEY, {
                            expiresIn: "2d"
                        });
                        console.log(token);
                        _a = user._doc, password = _a.password, isAdmin = _a.isAdmin, otherDetails = __rest(_a, ["password", "isAdmin"]);
                        res.status(200).json({ token: token, details: __assign({}, otherDetails), isAdmin: isAdmin });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.GoogleSignIn = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, name, token, googleId, imageUrl, existingUser, result, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, name = _a.name, token = _a.token, googleId = _a.googleId, imageUrl = _a.imageUrl;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, User_1["default"].findOne({ email: email })];
                    case 2:
                        existingUser = _b.sent();
                        if (existingUser) {
                            res.status(200).json({ result: existingUser, token: token });
                        }
                        if (!!existingUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, User_1["default"].create({
                                email: email,
                                username: name,
                                img: imageUrl,
                                googleId: googleId
                            })];
                    case 3:
                        result = _b.sent();
                        res.status(200).json({ result: result, token: token });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        console.log(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.emailVerified = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        token = req.query.token;
                        return [4 /*yield*/, User_1["default"].findOne({ emailToken: token })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        //assign value to database as verified
                        user.emailToken = null;
                        user.isVerified = true;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        //redirect to login page after verify email
                        res.redirect("http://localhost:3000/login");
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("Email is not verified");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.verifyPasswordMail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, OtpUser, otpCode, otpData, mailOptions, otpCode, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1["default"].findOne({ email: req.body.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 7];
                        return [4 /*yield*/, Otp_1.Otp.findOne({ email: req.body.email })];
                    case 2:
                        OtpUser = _a.sent();
                        if (!!OtpUser) return [3 /*break*/, 4];
                        otpCode = Math.floor(Math.random() * 10000 + 1);
                        otpData = new Otp_1.Otp({
                            email: req.body.email,
                            code: otpCode,
                            expiresIn: new Date().getTime() + 300 * 1000
                        });
                        return [4 /*yield*/, otpData.save()];
                    case 3:
                        _a.sent();
                        mailOptions = {
                            from: "nivethakumar1298@gmail.com",
                            to: user.email,
                            subject: "verify your email",
                            html: "<p>Hello ".concat(user.username, ". Your OTP is ").concat(otpData.code)
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log(info);
                                console.log("Verification Mail sent");
                            }
                        });
                        res.status(200).json({ message: "Success" });
                        _a.label = 4;
                    case 4:
                        if (!OtpUser) return [3 /*break*/, 6];
                        otpCode = Math.floor(Math.random() * 10000 + 1);
                        //save OTP to database with expire time
                        OtpUser.code = otpCode;
                        OtpUser.expiresIn = new Date().getTime() + 300 * 1000;
                        return [4 /*yield*/, OtpUser.save()];
                    case 5:
                        _a.sent();
                        mailOptions = {
                            from: "nivethakumar1298@gmail.com",
                            to: user.email,
                            subject: "verify your email",
                            html: "<p>Hello ".concat(user.username, ". Your OTP is ").concat(OtpUser.code)
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log(info);
                                console.log("Verification Mail sent");
                            }
                        });
                        res.status(200).json({ message: "Success" });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(400).json({ message: "EmailId not yet registered with funtabulous" })];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, currentTime, diff, user, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Otp_1.Otp.findOne({ email: req.body.email, code: req.body.code })];
                    case 1:
                        data = _a.sent();
                        if (!data) return [3 /*break*/, 6];
                        currentTime = new Date().getTime();
                        diff = data.expiresIn - currentTime;
                        if (!(diff < 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json("error")];
                    case 2: return [4 /*yield*/, User_1["default"].findOne({ email: req.body.email })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(req.body.password, 12)];
                    case 4:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        user.save();
                        console.log("Success");
                        res.status(200).json("Password Changed");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.status(400).json({ message: "Enter correct OTP" })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return Authentication;
}());
exports.Authentication = Authentication;
;
//# sourceMappingURL=auth.js.map