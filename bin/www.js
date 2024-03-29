#!/usr/bin/env node
require('dotenv').config();
const chalk = require('chalk');
const http = require('http');
const app = require('../server');

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, err => {
  if (err) {
    return console.log('😫', chalk.red(err));
  }
  console.log(`🚀 Now listening on AWESOME port ${chalk.green(port)}`);
});
