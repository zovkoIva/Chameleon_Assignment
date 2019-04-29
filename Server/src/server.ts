import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
//const bearerToken = require('express-bearer-token');
import {router as itemRouter} from './item'
const app = express()
  .use(cors())
  .use(bodyParser.json())
 // .use(bearerToken())
  .use(itemRouter);

app.listen(4201, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log('Listening on port 4201');
});