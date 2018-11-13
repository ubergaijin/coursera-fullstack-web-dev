const express = require('express');
const createError = require('http-errors');
const Favorites = require('../models/favorite');
const auth = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
    .get(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Favorites.findOne({ user: req.user._id })
          .populate(['user', 'dishes'])
          .then(favorite => res.json(favorite))
          .catch(err => next(err));
    })
    .post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Favorites.findOne({ user: req.user._id })
          .then(favorite => {
            if (!favorite) {
              return Favorites.create({ user: req.user._id, dishes: req.body });
            } else {
              req.body.forEach(({ _id }) => {
                if (favorite.dishes.indexOf(_id) === -1) {
                  favorite.dishes.push(_id);
                }
              });
              return favorite.save();
            }
          })
          .then(favorite => res.json(favorite))
          .catch(err => next(err));
    })
    .delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Favorites.findOneAndRemove({ user: req.user._id })
          .then(favorite => res.json(favorite))
          .catch(err => next(err));
    });

favoriteRouter.route('/:dishId')
    .post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Favorites.findOne({ user: req.user._id })
          .then(favorite => {
            if (!favorite) {
              return Favorites.create({ user: req.user._id, dishes: [req.params.dishId] });
            } else {
              if (favorite.dishes.indexOf(req.params.dishId) === -1) {
                favorite.dishes.push(req.params.dishId);
              }
              return favorite.save();
            }
          })
          .then(favorite => res.json(favorite))
          .catch(err => next(err));
    })
    .delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Favorites.findOne({ user: req.user._id })
          .then(favorite => {
            if (!favorite || favorite.dishes.indexOf(req.params.dishId) === -1) {
              return Promise.reject(
                  createError(404, `Dish ${req.params.dishId} not in favorites.`));
            } else {
              favorite.dishes.pull(req.params.dishId);
              return favorite.save();
            }
          })
          .then(favorite => res.json(favorite))
          .catch(err => next(err));
    });

module.exports = favoriteRouter;