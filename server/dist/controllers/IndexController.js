"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECT = void 0;
const CONNECT = (req, res) => {
    res.status(200).send('Connected to API');
};
exports.CONNECT = CONNECT;
