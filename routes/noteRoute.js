const express = require('express');
const router = express.Router();
const noteHandler = require('../controller/note');
const catchAsync = require('../utilities/catchAsync');
const { validateNote, isLoggedIn } = require('../middleware');

router.route('/')
    .get(noteHandler.index);

router.route('/dashboard')
    .get(isLoggedIn, catchAsync(noteHandler.dashBoard));

router.route('/newNote')
    .get(isLoggedIn, noteHandler.new)
    .post(isLoggedIn, validateNote, catchAsync(noteHandler.newNote));

router.route('/dashboard/item/:id')
    .get(isLoggedIn, catchAsync(noteHandler.viewItem));

router.route('/item/:id/update')
    .patch(validateNote, catchAsync(noteHandler.updateNote));

router.route('/item/:id/delete')
    .delete(catchAsync(noteHandler.deleteNote));

module.exports = router;