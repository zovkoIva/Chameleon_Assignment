"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const bearerToken = require('express-bearer-token');
const item_1 = require("./item");
const app = express()
    .use(cors())
    .use(bodyParser.json())
    // .use(bearerToken())
    .use(item_1.router);
app.listen(4201, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log('Listening on port 4201');
});
