const express = require("express");

//controllers
const { createNewComment,getComment } = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");

const commentsRouter = express.Router();


commentsRouter.get("/books/:room_id/comments")

commentsRouter.post(
  "/books/:book_id/comments",
  authentication,
  createNewComment
);

module.exports = commentsRouter;
