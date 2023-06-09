const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// get
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getOneBook);

// delete
router.delete('/:id', bookController.deleteBook);

// post
router.post('/', bookController.addBook);

module.exports = router;