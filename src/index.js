// MOCKING DATABASE DUE TO TIME CONSTRAINTS
global.database = {
    products: {
        list: [],
        lenght: 0
    }
};

import Server from './server.js';
import express from 'express';
const app = express();
const server = new Server(app);
server.startServer();