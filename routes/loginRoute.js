const express = require('express');
const router = express.Router();
const loginHandler = require('../controller/login');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');

router.route('/register')
    .get(loginHandler.register)
    .post(catchAsync(loginHandler.newUser));

router.route('/login')
    .get(loginHandler.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/auth/login' }), loginHandler.loginUser);

router.route('/logout')
    .get(loginHandler.logout);

module.exports = router;