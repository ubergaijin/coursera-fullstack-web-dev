const express = require('express');
const createError = require('http-errors');
const authenticate = require('../authenticate');
const multer = require('multer');

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
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.status(403).end(`GET operation not supported on /imageUpload`);
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin,
        upload.single('imageFile'), (req, res) => {
          res.json(req.file);
        })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.status(403).end(`PUT operation not supported on /imageUpload`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.status(403).end(`DELETE operation not supported on /imageUpload`);
    });

module.exports = uploadRouter;