const express = require('express');
const bookController = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

// get
router.get('/', auth, bookController.getAllBooks);
router.get('/:id', auth, bookController.getOneBook);

// delete
router.delete('/:id', auth, bookController.deleteBook);

// post
router.post('/', auth, multer, bookController.createBook);

//put
router.put('/:id', auth, multer, bookController.modifyBook);

module.exports = router;