const express = require('express');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

getLeaderById = (dishId) => {
  return new Promise((resolve, reject) => {
    Dishes.findById(dishId)
        .then(dish => {
          if (dish != null) {
            resolve(dish);
          } else {
            const err = new Error(`Dish ${dishId} not found`);
            err.status = 404;
            reject(err);
          }
        }, err => reject(err));
  });
};

getDishAndCommentById = (dishId, commentId) => {
  return new Promise((resolve, reject) => {
    getLeaderById(dishId)
        .then(dish => {
          const comment = dish.comments.id(commentId);
          if (comment != null) {
            resolve({ dish: dish, comment: comment });
          } else {
            const err = new Error(`Comment ${commentId} not found`);
            err.status = 404;
            reject(err);
          }
        }, err => reject(err));
  });
};

dishRouter.route('/')
    .get((req, res, next) => {
      Dishes.find({}).then(dishes => res.json(dishes), err => next(err));
    })
    .post((req, res, next) => {
      Dishes.create(req.body).then(dishes => res.json(dishes), err => next(err));
    })
    .put((req, res) => {
      res.status(403).end(`PUT operation not supported on /dishes`);
    })
    .delete((req, res, next) => {
      Dishes.remove({}).then(resp => res.json(resp), err => next(err));
    });

dishRouter.route('/:dishId')
    .get(({ params: { dishId } }, res, next) => {
      getLeaderById(dishId).then(dish => res.json(dish), err => next(err));
    })
    .post(({ params: { dishId } }, res) => {
      res.status(403).end(`POST operation not supported on /dishes/${dishId}`);
    })
    .put(({ body, params: { dishId } }, res, next) => {
      getLeaderById(dishId)
          .then(dish => {
            dish.set(body);
            return dish.save();
          })
          .then(dish => res.json(dish))
          .catch(err => next(err));
    })
    .delete(({ params: { dishId } }, res, next) => {
      getLeaderById(dishId)
          .then(dish => dish.remove())
          .then(dish => res.json(dish))
          .catch(err => next(err));
    });

dishRouter.route('/:dishId/comments')
    .get(({ params: { dishId } }, res, next) => {
      getLeaderById(dishId).then(dish => res.json(dish.comments), err => next(err));
    })
    .post(({ body, params: { dishId } }, res, next) => {
      getLeaderById(dishId)
          .then(dish => {
            dish.comments.push(body);
            return dish.save();
          })
          .then(dish => res.json(dish))
          .catch(err => next(err));
    })
    .put(({ params: { dishId } }, res) => {
      res.status(403).end(`PUT operation not supported on /dishes/${dishId}/comments`);
    })
    .delete(({ params: { dishId } }, res, next) => {
      getLeaderById(dishId)
          .then(dish => {
            dish.comments = [];
            return dish.save();
          })
          .then(dish => res.json(dish))
          .catch(err => next(err));
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get(({ params: { dishId, commentId } }, res, next) => {
      getDishAndCommentById(dishId, commentId)
          .then(({ comment }) => res.json(comment), err => next(err));
    })
    .post(({ params: { dishId, commentId } }, res) => {
      res.status(403).end(`POST operation not supported on /dishes/${dishId}/comments/${commentId}`);
    })
    .put(({ body, params: { dishId, commentId } }, res, next) => {
      getDishAndCommentById(dishId, commentId)
          .then(({ dish, comment }) => {
            if (body.rating) { comment.rating = body.rating; }
            if (body.comment) { comment.comment = body.comment; }
            return dish.save();
          })
          .then(dish => res.json(dish))
          .catch(err => next(err));
    })
    .delete(({ params: { dishId, commentId } }, res, next) => {
      getDishAndCommentById(dishId, commentId)
          .then(({ dish, comment }) => {
            comment.remove();
            return dish.save();
          })
          .then(dish => res.json(dish))
          .catch(err => next(err));
    });

module.exports = dishRouter;