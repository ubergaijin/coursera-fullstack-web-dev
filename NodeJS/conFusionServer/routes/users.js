const express = require('express');
const createError = require('http-errors');
const passport = require('passport');

const User = require('../models/user');
const auth = require('../authenticate');
const cors = require('./cors');

const router = express.Router();

router.options('*', cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.get('/', cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
  User.find({}).then(users => res.json(users), err => next(err));
});

router.post('/signup', cors.corsWithOptions, (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password,
      (err, user) => {
        if (err) {
          res.status(500).json({ err: err });
        } else {
          if (req.body.firstname) {
            user.firstname = req.body.firstname;
          }
          if (req.body.lastname) {
            user.lastname = req.body.lastname;
          }
          user.save((err, user) => {
            if (err) {
              res.status(500).json({ err: err });
            } else {
              passport.authenticate('local')(req, res, () => {
                res.json({ success: true, status: 'Registration Successful!' });
              });
            }
          });
        }
      });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.status(401).json({ success: false, status: 'Login Unsuccessful!', err: info });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.status(401).json({ success: false, status: 'Could not log in user!', err: info });
        } else {
          const token = auth.getToken({ _id: req.user._id });
          res.json({ success: true, status: 'Login Successful!', token: token });
        }
      });
    }
  })(res, req, next);
});

router.get('/logout', cors.corsWithOptions, (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    next(createError(403, 'You are not logged in!'));
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    const token = auth.getToken({ _id: req.user._id });
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
  }
});

router.get('/checkJWTToken', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.status(401).json({ success: false, status: 'JWT invalid!', err: info });
    } else {
      res.json({ success: true, status: 'JWT valid!', user: user });
    }
  })(req, res, next);
});

module.exports = router;
