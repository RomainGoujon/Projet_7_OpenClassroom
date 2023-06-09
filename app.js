const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import des routes
const booksRoutes = require('./routes/book.routes');

// lien pour connecter avec MongoDB
mongoose.connect('mongodb+srv://romainG:grimoirOpenClassroom@cluster0.b1wdcec.mongodb.net/?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));    

// app.use en dessous
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});
app.use('/api/books', booksRoutes);


module.exports = app;