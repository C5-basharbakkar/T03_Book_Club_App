const connection = require("../models/db");

const addRoom = (req, res) => {
  const book_id = req.params.book_id;
  const name = req.body.name;
  const query = `INSERT INTO rooms (name) VALUES(?) where rooms.book_id=? `;
  const data = [book_id, name];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Room created",
      result: result,
    });
  });
};

const getAllRoom = (req, res) => {
  const query = `SELECT * from rooms where is_deleted=0`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `All Rooms`,
      result,
    });
  });
};

const deleteRoomById = (req, res) => {
  const book_id = req.params.book_id;
  const query = `UPDATE rooms SET is_deleted=1 WHERE book_id=?;`;

  const data = [book_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The room: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete room with id: ${id}`,
      result: result,
    });
  });
};

const getRoomByBookId = (req, res) => {
  const book_id = req.params.book_id;
  const query = `SELECT * FROM rooms where is_deleted=0 And rooms.book_id=?`;
  const data = [book_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to get room with Book_id: ${id}`,
      result,
    });
  });
};

const joinRoom = (req, res) => {
  const user_id = req.token.user_id;
  const book_id = req.params.id;
  const query = `INSERT INTO rooms (user_id,book_id)VALUES(?,?)`;
  const data = [user_id, book_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "you joined in room successfully",
      result,
    });
  });
};

const quiteRoom = (req, res) => {
  const user_id = req.token.user_id;
  const book_id = req.params.book_id;
  const query = `UPDATE rooms SET is_deleted=1 WHERE book_id=? AND user_id=?;`;
  const data = [user_id, book_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err,
      });
    }

    res.status(201).json({
      success: true,
      message: "you left from room",
      result,
    });
  });
};

module.exports = {
  addRoom,
  getAllRoom,
  deleteRoomById,
  getRoomByBookId,
  quiteRoom,
  joinRoom
};
