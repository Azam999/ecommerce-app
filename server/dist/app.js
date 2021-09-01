"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const router = express_1.default.Router();
// Initial setup
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Connect to MongoDB via Mongoose
mongoose.connect(process.env.MONGO_URI);
// Routes
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const items_1 = __importDefault(require("./routes/items"));
const orders_1 = __importDefault(require("./routes/orders"));
router.use('/', index_1.default);
router.use('/users', users_1.default);
router.use('/auth', auth_1.default);
router.use('/items', items_1.default);
router.use('/orders', orders_1.default);
app.use('/api', router);
app.use('*', (req, res) => {
    res.status(404).json({
        message: "404 Not Found",
        code: res.statusCode
    });
});
module.exports = app;
