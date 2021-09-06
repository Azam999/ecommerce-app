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
exports.GENERATE_TOKEN = exports.LOGIN = exports.REGISTER = void 0;
const User_model_1 = require("../models/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function createTokens(jwtPayload, both) {
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_KEY, {
        expiresIn: '15m',
    });
    if (both) {
        const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_REFRESH_KEY, {
            expiresIn: '30d',
        });
        return { accessToken, refreshToken };
    }
    else {
        return accessToken;
    }
}
const REGISTER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = new User(req.body);
    const { name, email, password } = req.body;
    const user = yield User_model_1.User.findOne({ email });
    if (user) {
        return res.status(409).json({
            message: 'An account with that email already exists',
        });
    }
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new User_model_1.User({
        name,
        email,
        password: hash,
    });
    newUser.save().then((userInfo) => {
        const jwtPayload = {
            _id: userInfo._id,
        };
        const { accessToken, refreshToken } = createTokens(jwtPayload, true);
        res.status(201).send({
            user: {
                _id: userInfo._id,
                name: userInfo.name,
                email: userInfo.email,
            },
            accessToken,
            refreshToken,
            message: 'User Created',
            auth: true,
        });
    });
});
exports.REGISTER = REGISTER;
const LOGIN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        if (!email) {
            return res.status(401).json({
                message: 'Please enter an email',
                code: res.statusCode,
            });
        }
        else if (!password) {
            return res.status(401).json({
                message: 'Please enter a password',
                code: res.statusCode,
            });
        }
        else {
            return res.status(401).json({
                message: 'Please enter both the email and password',
                code: res.statusCode,
            });
        }
    }
    if (password.length < 8) {
        return res.status(401).json({
            message: 'Password must be at least 8 characters long',
            code: res.statusCode,
        });
    }
    const user = yield User_model_1.User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: 'An account with that email does not exist',
            code: res.statusCode,
        });
    }
    const passwordVerified = yield bcryptjs_1.default.compare(password, user.password);
    const jwtPayload = {
        _id: user._id,
    };
    if (passwordVerified) {
        const { accessToken, refreshToken } = createTokens(jwtPayload, true);
        console.log(accessToken);
        res.status(201).send({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
            message: 'Authenticated',
            auth: true,
        });
    }
    else {
        res.status(401).json({
            message: 'Not Authenticated',
            auth: false,
        });
    }
});
exports.LOGIN = LOGIN;
const GENERATE_TOKEN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).send({
            error: 'No token supplied',
            code: res.statusCode,
        });
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        const accessToken = createTokens({ _id: user._id }, false);
        res.json({
            accessToken
        });
    });
});
exports.GENERATE_TOKEN = GENERATE_TOKEN;
