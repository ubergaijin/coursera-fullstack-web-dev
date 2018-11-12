const express = require('express');
const Promotions = require('../models/promotions');

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
    .post((req, res, next) => {
      Promotions.create(req.body).then(promos => res.json(promos), err => next(err));
    })
    .put((req, res) => {
      res.status(403).end(`PUT operation not supported on /promotions`);
    })
    .delete((req, res, next) => {
      Promotions.remove({}).then(resp => res.json(resp), err => next(err));
    });

promoRouter.route('/:id')
    .get(({ params: { id } }, res, next) => {
      getPromoById(id).then(promo => res.json(promo), err => next(err));
    })
    .post(({ params: { id } }, res) => {
      res.status(403).end(`POST operation not supported on /promotions/${id}`);
    })
    .put(({ body, params: { id } }, res, next) => {
      getPromoById(id).then(promo => {
        promo.set(body);
        promo.save().then(promo => res.json(promo), err => next(err));
      }, err => next(err));
    })
    .delete(({ params: { id } }, res, next) => {
      getPromoById(id).then(promo => {
        promo.remove().then(promo => res.json(promo), err => next(err));
      }, err => next(err));
    });

module.exports = promoRouter;