"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemModel_1 = require("./itemModel");
exports.router = express_1.Router();
exports.router.get('/item', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield itemModel_1.getItemRepository();
            const allItems = yield repository.find();
            res.send(allItems);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/item/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield itemModel_1.getItemRepository();
            const item = yield repository.find({ id: req.params.id });
            res.send(item);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/item', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield itemModel_1.getItemRepository();
            const item = new itemModel_1.Item();
            item.name = req.body.name;
            item.isFinished = req.body.isFinished;
            console.log(item);
            const result = yield repository.save(item);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/item/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield itemModel_1.getItemRepository();
            const item = yield repository.findOne({ id: req.params.id });
            item.name = req.body.name;
            item.isFinished = req.body.isFinished;
            const result = yield repository.save(item);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/item/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield itemModel_1.getItemRepository();
            yield repository.delete({ id: req.params.id });
            res.send(true);
        }
        catch (err) {
            return next(false);
        }
    });
});
