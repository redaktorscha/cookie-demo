import request from 'supertest';

import express from 'express';
import bodyParser from 'body-parser';
import {
    createReadStream,
    writeFileSync
} from 'fs';
import crypto from 'crypto';
import http from 'http';

import appSrc from '../app.js';
import cors from '../CORS.js';

import getClientRequest from '../getClientRequest.js';
import finalHandler from '../finalHandler.js';
import contentType from '../contentType.js';


(async () => {
    const app = appSrc(express, bodyParser, createReadStream, writeFileSync, crypto, http, cors, getClientRequest, finalHandler, contentType);


    //console.log(app);

    const server = request(app);
    //const result = await server.get('/login/');
    //console.log(result.text);//mariianasonkina
    //console.log(result.statusCode);//200
    describe('login endpoint', () => {
        it('is expected to return text "mariianasonkina"', async () => {
            const res = await server.get('/login/');
            expect(res.text).toEqual('mariianasonkina');
        });
        it('is expected to return code status 200', async () => {
            const res = await server.get('/login/');
            expect(res.statusCode).toEqual(200);
        })
    });



})()