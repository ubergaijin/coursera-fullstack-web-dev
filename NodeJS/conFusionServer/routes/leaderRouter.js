const express = require('express');
const Leaders = require('../models/leaders');
const authenticate = require('../authenticate');
const leaderRouter = express.Router();

getLeaderById = (id) => {
  return new Promise((resolve, reject) => {
    Leaders.findById(id)
        .then(leader => {
          if (leader != null) {
            resolve(leader);
          } else {
            const err = new Error(`Leader ${id} not found`);
            err.status = 404;
            reject(err);
          }
        }, err => reject(err));
  });
};

leaderRouter.route('/')
    .get((req, res, next) => {
      Leaders.find({}).then(leaders => res.json(leaders), err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
      Leaders.create(req.body).then(leaders => res.json(leaders), err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
      res.status(403).end(`PUT operation not supported on /leaders`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
      Leaders.remove({}).then(resp => res.json(resp), err => next(err));
    });

leaderRouter.route('/:id')
    .get(({ params: { id } }, res, next) => {
      getLeaderById(id).then(leader => res.json(leader), err => next(err));
    })
    .post(authenticate.verifyUser, ({ params: { id } }, res) => {
      res.status(403).end(`POST operation not supported on /leaders/${id}`);
    })
    .put(authenticate.verifyUser, ({ body, params: { id } }, res, next) => {
      getLeaderById(id).then(leader => {
        leader.set(body);
        leader.save().then(leader => res.json(leader), err => next(err));
      }, err => next(err));
    })
    .delete(authenticate.verifyUser, ({ params: { id } }, res, next) => {
      getLeaderById(id).then(leader => {
        leader.remove().then(leader => res.json(leader), err => next(err));
      }, err => next(err));
    });

module.exports = leaderRouter;