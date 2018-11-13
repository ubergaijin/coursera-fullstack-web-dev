const express = require('express');
const createError = require('http-errors');
const multer = require('multer');
const auth = require('../authenticate');
const cors = require('./cors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(cors.cors, auth.verifyUser, auth.verifyAdmin, (req, res) => {
      res.status(403).end(`GET operation not supported on /imageUpload`);
    })
    .post(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin,
        upload.single('imageFile'), (req, res) => {
          res.json(req.file);
        })
    .put(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res) => {
      res.status(403).end(`PUT operation not supported on /imageUpload`);
    })
    .delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res) => {
      res.status(403).end(`DELETE operation not supported on /imageUpload`);
    });

module.exports = uploadRouter;