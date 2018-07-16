const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
  addToDb(req, res);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(501).json(err);
    if (!user) return res.status(501).json(info);

    req.login(user, function(err) {
      if (err) return res.status(501).json(err);
      return res.status(200).json({message: 'login success'});
    });
  })(req, res, next);
});

router.get('/user', isValidUser, (req, res, next) => {
  return res.status(200).json(req.user);
});

router.get('/logout', isValidUser, (req, res, next) => {
  req.logout();
  return res.status(200).json({message: 'logout success'});;
});

function isValidUser (req, res ,next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({message: 'Unauthorized Request'});
}

async function addToDb(req, res) {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    creation_dt: Date.now()
  });

  try {
    saved = await user.save();
    res.status(200).json(saved);
  } catch (error) {
    return res.status(501).json(error);
  }
}

module.exports = router;
