const express = require('express');
const createError = require('http-errors');
const Comments = require('../models/comments');
const auth = require('../authenticate');
const cors = require('./cors');

const commentRouter = express.Router();

commentRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
      Comments.find(req.query)
          .populate('author')
          .then(comments => res.json(comments))
          .catch(err => next(err));
    })
    .post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      if (req.body != null) {
        req.body.author = req.user._id;
        Comments.create(req.body)
            .then(comments => Comments.findById(comments._id).populate('author'))
            .then(comments => res.json(comments))
            .catch(err => next(err));
      } else {
        next(createError(403, 'Comment not found in request body'));
      }
    })
    .put(cors.corsWithOptions, auth.verifyUser, (req, res) => {
      res.status(403).end(`PUT operation not supported on /comments`);
    })
    .delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
      Comments.remove({})
          .then(resp => res.json(resp))
          .catch(err => next(err));
    });

commentRouter.route('/:commentId')
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
      Comments.findById(req.params.commentId)
          .populate('author')
          .then(comment => res.json(comment))
          .catch(err => next(err));
    })
    .post(cors.corsWithOptions, auth.verifyUser, (req, res) => {
      res.status(403).end(`POST operation not supported on /comments/${req.params.commentId}`);
    })
    .put(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Comments.findById(eq.params.commentId)
          .then(comment => {
            if (comment != null) {
              if (req.user._id.equals(comment.author)) {
                req.body.author = req.user._id;
                return Comments.findByIdAndUpdate(req.params.commentId,
                    { $set: req.body }, { new: true })
                    .populate('author');
              } else {
                return Promise.reject(createError(403, 'You are not authorized to perform this operation!'));
              }
            } else {
              return Promise.reject(createError(404, `Comment ${req.params.commentId} not found`));
            }
          })
          .then(comment => res.json(comment))
          .catch(err => next(err));
    })
    .delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
      Comments.findById(req.params.commentId)
          .then(comment => {
            if (comment != null) {
              if (req.user._id.equals(comment.author)) {
                return Comments.findByIdAndRemove(req.params.commentId);
              } else {
                return Promise.reject(createError(403, 'You are not authorized to perform this operation!'));
              }
            } else {
              return Promise.reject(createError(404, `Comment ${req.params.commentId} not found`));
            }
          })
          .then(comment => res.json(comment))
          .catch(err => next(err));
    });

module.exports = commentRouter;