const moongoose = require('moongoose');
const book = require('../models/Book.model');

exports.getAllBooks = (req, res, next) => {
    book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    book.findOne({ _id: req.params.id })
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }));
};

exports.addBook = (req, res, next) => {
    delete req.body._id;
    const book = new book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyBook = (req, res, next) => {
    book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
        .then(books => res.status(200).json({ message: "Livre modifié avec succès !"}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    book.deleteOne({ _id: req.params.id })
        .then(books => res.status(200).json({ massage: 'Livre supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};