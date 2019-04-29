"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multipart = require('../node_modules/connect');
const multipartMiddleware = multipart({ uploadDir: './uploads' });
exports.router = express_1.Router();
exports.router.post('/upload', multipartMiddleware, (req, res) => {
    res.json({
        'message': 'Successfully uploaded file'
    });
});
