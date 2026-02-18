const express = require('express');
const mogoose = require('mongoose');
const bodyParser = require('body-parser');

mogoose.connect('mongodb://admin:OKYcnm94508@node86044-adv-compro.proen.app.ruk-com.cloud:11749', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);

const Book = mogoose.model('Book', {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());

app.post('/books', async (req, res) => {
    try {
        const lastBook = await Book.findOne().sort({ id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;
        const book = new Book({ 
            id: nextId,
            ...req.body,
        });
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        await Book.findOneAndDelete({ id: req.params.id });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});