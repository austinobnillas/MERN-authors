const Author = require("../models/authors.model");

module.exports = {
    getAllAuthors: (req, res) => {
        Author.find()
            .then(authors => res.json(authors))
            .catch(err => res.json(err));
    },
    getOneAuthor: (req, res) => {
        Author.findById({_id: req.params.id})
            .then(oneAuthor => res.json(oneAuthor))
            .catch(err => console.log(err));
    },
    addAuthor: (req, res) => {
        const {name} = req.body;
        Author.create({name})
        .then(newAuthor => res.json(newAuthor))
        .catch(err => res.status(400).json(err));
    },
    updateAuthor: (req, res) => {
        Author.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then(updatedAuthor => res.json(updatedAuthor))
            .catch(err => res.status(400).json(err));
    },
    deleteAuthor: (req, res) => {
        Author.findByIdAndDelete({_id: req.params.id})
            .then(deletedAuthor => res.json(deletedAuthor))
            .catch(err => console.log(err))
    }
}