import express from 'express';
import bodyParser from 'body-parser';
import {
    createReadStream, writeFileSync
} from 'fs';
import crypto from 'crypto';
import http from 'http';

import appSrc from './app.js';
import cors from './CORS.js';
import dot from 'dotenv';

import getClientRequest from './getClientRequest.js';
import finalHandler from './finalHandler.js';
import contentType from './contentType.js';


dot.config({
    path: './.env'
});
const {
    URL
} = process.env;

const app = appSrc(express, bodyParser, createReadStream, writeFileSync, crypto, http, cors, getClientRequest, finalHandler, contentType);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}, PID: ${process.pid}`);
})