const express = require('express');
const createError = require('http-errors');
const Promotions = require('../models/promotions');
const authenticate = require('../authenticate');

const promoRouter = express.Router();

getPromoById = (id) => {
  return new Promise((resolve, reject) => {
    Promotions.findById(id)
        .then(promo => {
          if (promo != null) {
            resolve(promo);
          } else {
            reject(createError(404, `Promotion ${id} not found`));
          }
        }, err => reject(err));
  });
};

promoRouter.route('/')
    .get((req, res, next) => {
      Promotions.find({}).then(promos => res.json(promos), err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Promotions.create(req.body).then(promos => res.json(promos), err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.status(403).end(`PUT operation not supported on /promotions`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Promotions.remove({}).then(resp => res.json(resp), err => next(err));
    });

promoRouter.route('/:id')
    .get((req, res, next) => {
      getPromoById(req.params.id)
          .then(promo => res.json(promo))
          .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.status(403).end(`POST operation not supported on /promotions/${req.params.id}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      getPromoById(req.params.id)
          .then(promo => {
            promo.set(req.body);
            return promo.save();
          })
          .then(promo => res.json(promo))
          .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      getPromoById(req.params.id)
          .then(promo => promo.remove())
          .then(promo => res.json(promo))
          .catch(err => next(err));
    });

module.exports = promoRouter;