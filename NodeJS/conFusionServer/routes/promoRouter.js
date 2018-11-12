const express = require('express');
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
            const err = new Error(`Promotion ${id} not found`);
            err.status = 404;
            reject(err);
          }
        }, err => reject(err));
  });
};

promoRouter.route('/')
    .get((req, res, next) => {
      Promotions.find({}).then(promos => res.json(promos), err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
      Promotions.create(req.body).then(promos => res.json(promos), err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
      res.status(403).end(`PUT operation not supported on /promotions`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
      Promotions.remove({}).then(resp => res.json(resp), err => next(err));
    });

promoRouter.route('/:id')
    .get(({ params: { id } }, res, next) => {
      getPromoById(id).then(promo => res.json(promo), err => next(err));
    })
    .post(authenticate.verifyUser, ({ params: { id } }, res) => {
      res.status(403).end(`POST operation not supported on /promotions/${id}`);
    })
    .put(authenticate.verifyUser, ({ body, params: { id } }, res, next) => {
      getPromoById(id)
          .then(promo => {
            promo.set(body);
            return promo.save();
          })
          .then(promo => res.json(promo))
          .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, ({ params: { id } }, res, next) => {
      getPromoById(id)
          .then(promo => promo.remove())
          .then(promo => res.json(promo))
          .catch(err => next(err));
    });

module.exports = promoRouter;