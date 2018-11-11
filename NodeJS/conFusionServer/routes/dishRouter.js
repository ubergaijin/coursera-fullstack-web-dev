const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get((req, res, next) => {
      Dishes.find({})
          .then(dishes => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
          })
          .catch(err => next(err));
    })
    .post((req, res, next) => {
      Dishes.create(req.body)
          .then(dish => {
            console.log('Dish Created', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
          })
          .catch(err => next(err));
    })
    .put((req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not supported on /dishes`);
    })
    .delete((req, res, next) => {
      Dishes.deleteMany({})
          .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          })
          .catch(err => next(err));
    });

dishRouter.route('/:dishId')
    .get((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
          })
          .catch(err => next(err));
    })
    .post((req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
    })
    .put((req, res, next) => {
      Dishes.findByIdAndUpdate(req.params.dishId,
          { $set: req.body })
          .then(dish => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
          })
          .catch(err => next(err));
    })
    .delete((req, res, next) => {
      Dishes.findByIdAndDelete(req.params.dishId)
          .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          })
          .catch(err => next(err));
    });

dishRouter.route('/:dishId/comments')
    .get((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            if (dish != null) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish.comments);
            } else {
              const err = new Error(`Dish ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }
          })
          .catch(err => next(err));
    })
    .post((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            if (dish != null) {
              dish.comments.push(req.body);
              dish.save()
                  .then(dish => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                  })
                  .catch(err => next(err));
            } else {
              const err = new Error(`Dish ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }
          })
          .catch(err => next(err));
    })
    .put((req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not supported on /dishes/${req.params.dishId}/comments`);
    })
    .delete((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            if (dish != null) {
              dish.comments = [];
              dish.save()
                  .then(dish => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                  })
                  .catch(err => next(err));
            } else {
              const err = new Error(`Dish ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }
          })
          .catch(err => next(err));
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            if (dish != null) {
              const comment = dish.comments.id(req.params.commentId);
              if (comment != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
              } else {
                const err = new Error(`Comment ${req.params.commentId} not found`);
                err.status = 404;
                return next(err);
              }
            } else {
              const err = new Error(`Dish ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }
          })
          .catch(err => next(err));
    })
    .post((req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`);
    })
    .put((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            if (dish != null) {
              const comment = dish.comments.id(req.params.commentId);
              if (comment != null) {
                if (req.body.rating) {
                  comment.rating = req.body.rating;
                }
                if (req.body.comment) {
                  comment.comment = req.body.comment;
                }
                dish.save()
                    .then(dish => {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json(dish);
                    })
                    .catch(err => next(err));
              } else {
                const err = new Error(`Comment ${req.params.commentId} not found`);
                err.status = 404;
                return next(err);
              }
            } else {
              const err = new Error(`Dish ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }
          })
          .catch(err => next(err));
    })
    .delete((req, res, next) => {
      Dishes.findById(req.params.dishId)
          .then(dish => {
            if (dish != null) {
              if (dish.comments.id(req.params.commentId) != null) {
                dish.comments.pull({ _id: req.params.commentId });
                dish.save()
                    .then(dish => {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json(dish);
                    })
                    .catch(err => next(err));
              } else {
                const err = new Error(`Comment ${req.params.commentId} not found`);
                err.status = 404;
                return next(err);
              }
            } else {
              const err = new Error(`Dish ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }
          })
          .catch(err => next(err));
    });


module.exports = dishRouter;