const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');
const router = express.Router();

const { deleteBook } = require('../controllers/book/deleteBook');
const { getAllBooks } = require('../controllers/book/getAllBooks');
const { createBook } = require('../controllers/book/createBook');
const { getOneBook } = require('../controllers/book/getOneBook');
const { modifyBook } = require('../controllers/book/modifyBook');
const { getBestBook } = require('../controllers/book/getBestBook');
const { rateBook } = require('../controllers/book/rateBook');


router.get('/', getAllBooks);
router.get('/bestrating', getBestBook);
router.get('/:id', getOneBook);

router.delete('/:id', auth, deleteBook);

router.post('/', auth, multer, sharp, createBook);
router.post('/:id/rating', auth, multer, rateBook);

router.put('/:id', auth, multer, sharp,  modifyBook);

module.exports = router;