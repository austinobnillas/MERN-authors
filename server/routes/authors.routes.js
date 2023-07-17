const AuthorController = require("../controllers/authors.controller");

module.exports = (app) => {
    app.get("/api/authors", AuthorController.getAllAuthors);
    app.get("/api/authors/:id", AuthorController.getOneAuthor);
    app.post("/api/authors/add", AuthorController.addAuthor);
    app.patch("/api/authors/update/:id", AuthorController.updateAuthor);
    app.delete("/api/authors/delete/:id", AuthorController.deleteAuthor);
}

