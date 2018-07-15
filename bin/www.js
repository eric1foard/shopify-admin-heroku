#!/usr/bin/env node
require('dotenv').config();
const chalk = require('chalk');
const http = require('http');
const app = require('../server');

const port = process.env.SHOPIFY_APP_PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, err => {
  if (err) {
    return console.log('😫', chalk.red(err));
  }
  console.log('environment!!!!!!!!!!!!!!!', JSON.stringify(process.env, null, 2))
  console.log(`🚀 Now listening on port ${chalk.green(port)}`);
});
