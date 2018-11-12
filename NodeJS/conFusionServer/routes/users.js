const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const User = require('../models/user');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username })
      .then(user => {
        if (user != null) {
          next(createError(403, `User ${req.body.username} already exists!`));
        } else {
          User.create({
                username: req.body.username,
                password: req.body.password
              })
              .then(user => res.json({ status: 'Registration Successful!', user: user }))
              .catch(err => next(err));
        }
      })
      .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  if (!req.session.user) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.setHeader('WWW-Authenticate', 'Basic');
      next(createError(401, 'You are not authenticated!'));
    } else {
      const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

      User.findOne({ username: username })
          .then(user => {
            if (!user) {
              next(createError(401, `User ${username} does not exist!`));
            } else if (user.password !== password) {
              next(createError(401, `Your password is incorrect!`));
            } else {
              req.session.user = 'authenticated';
              res.end('You are authenticated!');
            }
          })
          .catch(err => next(err));
    }
  } else {
    res.end('You are already authenticated!');
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    next(createError(403, 'You are not logged in!'));
  }
});

module.exports = router;
