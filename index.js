require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { api } = require('./config');

const db = require('./src/db');
const setRouters = require('./src/routers');

const initDatabase = async () => {
    try {
        await db.authenticate();
        db.sync();

        console.log('Database connected.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const initServer = () => {
    const app = express();

    app.use(helmet());
    app.use(express.json());

    setRouters(app);

    app.listen(api.port, () => {
        console.log(`Server running on port ${api.port}`);
    });
};

const initApp = async () => {
    await initDatabase();

    initServer();
};

initApp();
