const passport = require('passport');
const createError = require('http-errors');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('./config');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey
};

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
      console.log('JWT payload', jwt_payload);
      User.findById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (!req.user) {
    next(createError(403, 'You are not authenticated!'));
  } else if (!req.user.admin) {
    next(createError(403, 'You are not authorized to perform this operation!'));
  } else {
    next();
  }
};

exports.facebookPassport = passport.use(
    new FacebookTokenStrategy({
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user !== null) {
          return done(null, user);
        } else {
          user = new User({
            username: profile.displayName,
            facebookId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName
          });
          user.save((err, user) => {
            if (err) {
              return done(err, false);
            } else {
              return done(null, user);
            }
          });
        }
      });
    }));
