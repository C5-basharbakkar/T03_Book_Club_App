const express = require("express");
const {
  getAllBooks,
  getBooksByAuthor,
  getBooksById,
  createNewBook,
  updateBookById,
  deleteBookById,
  viewReading,
  viewList,
  addList,
  deleteFromList
} = require("../controllers/book");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const BooksRouter = express.Router();

BooksRouter.get("/", getAllBooks);
BooksRouter.get("/search_1", getBooksByAuthor);
BooksRouter.get("/search_2/", getBooksById);
BooksRouter.get("/readers/:book_id",authentication,authorization,viewReading)
BooksRouter.get("/:book_id/:list_id",authentication,viewList)
BooksRouter.post("/:book_id/:list_id",authentication,addList)
BooksRouter.delete("/:book_id/:list_id",authentication,deleteFromList)


BooksRouter.post(
  "/",
  authentication,
  authorization,
  createNewBook
);
BooksRouter.put("/:id", updateBookById);
BooksRouter.delete("/:id", deleteBookById);

module.exports = BooksRouter;
