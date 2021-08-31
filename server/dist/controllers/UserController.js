"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDIT_USER = exports.DELETE_USER = exports.GET_ONE_USER = exports.GET_ALL_USERS = void 0;
const User_model_1 = require("../shared/models/User.model");
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
                email: user.email
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
const EDIT_USER = (req, res) => {
    res.status(200).send("Edit");
};
exports.EDIT_USER = EDIT_USER;
