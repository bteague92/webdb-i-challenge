const express = require('express');

const AccountRouter = require('./routers/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h3>Accounts</h3>');
});

module.exports = server;