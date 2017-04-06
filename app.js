'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { cyan, red } = require('chalk');

const routes = require('./routes/')

// pug configuration
app.set('view engine', 'pug');

app.locals.company = "🍕 Pizza Shack 🍕";
app.locals.errors = {};
app.locals.body = {};
app.locals.body.magic = "Foooooo!";

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(routes);

app.get('/login', (req, res, next) => {
  res.render('login', {page: 'Login'});
});

app.get('/register', (req, res, next) => {
  res.render('register', {page: 'Register'});
});

app.use((req, res) => {
  res.render('404');
});

// Error handling middleware
// You define error-handling middleware last, after other app.use() and routes calls
// https://expressjs.com/en/guide/error-handling.html
// Responses from within a middleware function can be in any format that you prefer,
// such as an HTML error page, a simple message, or a JSON string.
// How is this picked up in the sequence of events if the above res.render ends it?
// I guess that's a different end of the cycle?
// https://expressjs.com/en/guide/error-handling.html
// NOTE the destructuring of the request object here
app.use((err, { method, url, headers: { 'user-agent': agent } }, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    // Send the stack trace as a response, for debugging purposes
    res.set('Content-Type', 'text/plain').send(err.stack)
  }

  const timeStamp = new Date()
  const statusCode = res.statusCode
  const statusMessage = res.statusMessage

  console.error(
    `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
  )
  console.error("Oh, crud!!!!!", err.stack)
});

// ************ End of Middlewares ************

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
