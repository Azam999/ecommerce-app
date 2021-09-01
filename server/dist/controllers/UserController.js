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
exports.EDIT_USER = exports.DELETE_USER = exports.GET_ONE_USER = exports.GET_ALL_USERS = void 0;
const User_model_1 = require("../shared/models/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const GET_ALL_USERS = (req, res) => {
    User_model_1.User.find().exec((err, users) => {
        if (!err) {
            res.status(200).send(users);
        }
        else {
            res.status(500).json({
                error: err,
                code: res.statusCode,
            });
        }
    });
};
exports.GET_ALL_USERS = GET_ALL_USERS;
const GET_ONE_USER = (req, res) => {
    const { id } = req.body;
    User_model_1.User.findById(id).exec((err, user) => {
        if (!err) {
            res.status(200).send(user);
        }
        else {
            res.status(500).json({
                error: err,
                code: res.statusCode,
            });
        }
    });
};
exports.GET_ONE_USER = GET_ONE_USER;
const DELETE_USER = (req, res) => {
    const { id } = req.params;
    User_model_1.User.findByIdAndDelete(id)
        .then((user) => {
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            message: 'User deleted successfully',
        });
    })
        .catch((err) => {
        res.status(400).json({
            message: 'A user with that id does not exist',
            code: res.statusCode,
        });
    });
};
exports.DELETE_USER = DELETE_USER;
const EDIT_USER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password, name } = req.body;
    const { change } = req.query;
    switch (change) {
        case 'password':
            try {
                let hash = yield bcryptjs_1.default.hash(password, 10);
                if (password.length < 8)
                    throw {
                        error: 'Password must be at least 8 characters long',
                    };
                User_model_1.User.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, req.body), { password: hash }))
                    .then((user) => {
                    res.status(200).json({
                        user,
                        values: Object.assign(Object.assign({}, req.body), { password: hash }),
                    });
                })
                    .catch((err) => {
                    res.status(400).json({
                        error: err,
                    });
                });
            }
            catch (error) {
                res.send(error);
            }
            break;
        case 'name':
            User_model_1.User.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, req.body), { name }))
                .then((user) => {
                res.status(200).json({
                    user,
                    values: Object.assign(Object.assign({}, req.body), { name }),
                });
            })
                .catch((err) => {
                res.status(400).json({
                    error: err,
                });
            });
            break;
        default:
            res.status(400).json({
                message: 'You can only change the name or password',
            });
    }
});
exports.EDIT_USER = EDIT_USER;
