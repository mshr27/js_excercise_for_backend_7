const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments');

router.route('/')
        .get(controller.getComments)
        .post(controller.postComment);

router.route('/:id')
        .put(controller.putComment)
        .delete(controller.deleteComment);

module.exports = router;