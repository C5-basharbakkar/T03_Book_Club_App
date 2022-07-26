const connection = require("../models/db");

const createNewComment = (req, res) => {
  const room_id = req.params.room_id;
  const commenter_id = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, room_id) VALUES (?,?,?)`;
  const data = [comment, commenter_id, room_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      result: result,
    });
  });
};


const getComment = (req, res) => {
  const id = req.params.room_id;
  const query = `SELECT * FROM comments WHERE room_id=?`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.length) {
      res.status(404).json({
        success: false,
        massage: "The Book is not found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The Book ${id}`,
      results: results,
    });
  });
};

module.exports = {
  createNewComment,
  getComment
};
