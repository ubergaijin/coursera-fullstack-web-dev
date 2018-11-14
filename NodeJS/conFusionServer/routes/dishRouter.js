const express = require('express');
const createError = require('http-errors');
const Dishes = require('../models/dishes');
const auth = require('../authenticate');
const cors = require('./cors');

const dishRouter = express.Router();

getDishById = (dishId) => {
  return new Promise((resolve, reject) => {
    Dishes.findById(dishId)
        .then(dish => {
          if (dish != null) {
            resolve(dish);
          } else {
            reject(createError(404, `Dish ${dishId} not found`));
          }
        }, err => reject(err));
  });
};

dishRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
      Dishes.find(req.query).then(dishes => res.json(dishes), err => next(err));
    })
    .post(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
      Dishes.create(req.body).then(dishes => res.json(dishes), err => next(err));
    })
    .put(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res) => {
      res.status(403).end(`PUT operation not supported on /dishes`);
    })
    .delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
      Dishes.remove({}).then(resp => res.json(resp), err => next(err));
    });

dishRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
      getDishById(req.params.dishId)
          .then(dish => res.json(dish))
          .catch(err => next(err));
    })
    .post(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res) => {
      res.status(403).end(`POST operation not supported on /dishes/${req.params.dishId}`);
    })
    .put(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
      getDishById(req.params.dishId)
          .then(dish => {
            dish.set(req.body);
            return dish.save();
          })
          .then(dish => res.json(dish))
          .catch(err => next(err));
    })
    .delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
      getDishById(req.params.dishId)
          .then(dish => dish.remove())
          .then(dish => res.json(dish))
          .catch(err => next(err));
    });

module.exports = dishRouter;