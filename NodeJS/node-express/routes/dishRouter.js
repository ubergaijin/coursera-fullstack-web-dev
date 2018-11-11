const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
    })
    .get((req, res) => {
      res.end('Will send all the dishes to you!');
    })
    .post((req, res) => {
      res.end(`Will add the dish: ${req.body.name} with details: ${req.body.name}`);
    })
    .put((req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not supported on /dishes`);
    })
    .delete((req, res) => {
      res.end('Deleting all the dishes!');
    });

dishRouter.route('/:dishId')
    .get((req, res) => {
      res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
    })
    .post((req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
    })
    .put((req, res) => {
      res.write(`Updating the dish: ${req.params.dishId}\n`);
      res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}!`);
    })
    .delete((req, res) => {
      res.end(`Deleting dish: ${req.params.dishId}`);
    });

module.exports = dishRouter;