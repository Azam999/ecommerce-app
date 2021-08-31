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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = exports.REGISTER = void 0;
const User_model_1 = require("../shared/models/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const REGISTER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = new User(req.body);
    const { name, email, password } = req.body;
    const user = yield User_model_1.User.findOne({ email });
    if (user) {
        return res.status(409).json({
            message: "An account with that email already exists"
        });
    }
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new User_model_1.User({
        name,
        email,
        password: hash
    });
    newUser
        .save()
        .then((userInfo) => {
        jsonwebtoken_1.default.sign({
            _id: userInfo._id
        }, process.env.JWT_KEY, {
            expiresIn: "15m"
        }, (err, token) => {
            if (err)
                throw err;
            res.status(201).send({
                user: {
                    _id: userInfo._id,
                    name: userInfo.name,
                    email: userInfo.email,
                },
                token,
                message: "User Created",
                auth: true,
            });
        });
    });
});
exports.REGISTER = REGISTER;
const LOGIN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_model_1.User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: "An account with that email does not exist",
            code: res.statusCode
        });
    }
    const passwordVerified = yield bcryptjs_1.default.compare(password, user.password);
    const jwtPayload = {
        _id: user._id
    };
    if (passwordVerified) {
        jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_KEY, {
            expiresIn: "15m"
        }, (err, token) => {
            if (err)
                throw err;
            res.status(201).send({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                token,
                message: "Authenticated",
                auth: true
            });
        });
    }
    else {
        res.status(401).json({
            message: "Not Authenticated",
            auth: false,
        });
    }
});
exports.LOGIN = LOGIN;
