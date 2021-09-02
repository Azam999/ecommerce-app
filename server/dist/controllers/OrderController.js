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
exports.DELETE_ORDER = exports.CHANGE_ORDER_STATUS = exports.CREATE_ORDER = exports.GET_ORDERS = void 0;
const Order_model_1 = __importDefault(require("../shared/models/Order.model"));
const GET_ORDERS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        try {
            const orders = yield Order_model_1.default.find();
            res.status(200).send(orders);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    else {
        try {
            const order = yield Order_model_1.default.findById(id);
            res.status(200).send(order);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
});
exports.GET_ORDERS = GET_ORDERS;
const CREATE_ORDER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new Order_model_1.default(req.body);
        order
            .save()
            .then((order) => {
            res.status(200).send(order);
        })
            .catch((err) => {
            res.status(200).send(err);
        });
        res.status(201).send(order);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.CREATE_ORDER = CREATE_ORDER;
const CHANGE_ORDER_STATUS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.query;
    Order_model_1.default.findByIdAndUpdate(id, { status })
        .then(order => {
        res.status(200).json({
            order,
            status
        });
    })
        .catch(err => {
        res.status(400).send(err);
    });
});
exports.CHANGE_ORDER_STATUS = CHANGE_ORDER_STATUS;
const DELETE_ORDER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (status == 'ordered') {
        const order = Order_model_1.default.findByIdAndDelete(id);
        res.status(200).send(order);
    }
    else {
        res.status(400).json({
            message: "Can not cancel an order that has already been shipped or has arrived"
        });
    }
});
exports.DELETE_ORDER = DELETE_ORDER;
