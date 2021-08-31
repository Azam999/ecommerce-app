"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const rawToken = req.headers.authorization;
    const token = rawToken === null || rawToken === void 0 ? void 0 : rawToken.split(' ')[1];
    if (!rawToken || !token) {
        return res.status(401).json({
            message: 'No token, authorization denied',
        });
    }
    try {
        const jwtKey = process.env.JWT_KEY;
        let decoded;
        if (typeof token === 'string' && typeof jwtKey === 'string') {
            decoded = jsonwebtoken_1.default.verify(token, jwtKey);
        }
        req.userData = decoded;
    }
    catch (error) {
        return res.status(401).json({ error });
    }
    next();
};
exports.default = verifyToken;
