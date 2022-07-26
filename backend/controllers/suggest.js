const connection = require("../models/db");

const addSuggest = (req, res) => {
  const suggest = req.body.suggest;
  const suggester = req.token.suggester;
  const query = `INSERT INTO suggest (suggest) VALUES(?) where suggester=?`;
  const data = [suggest, suggester];
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
      message: "thank you for uour suggestion",
      result,
    });
  });
};

const getSuggest = (req, res) => {
  const query = `SELECT * FROM suggest INNER JOIN users ON suggest.suggester=users.id AND is_deleted=0`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: "All Suggest",
      result,
    });
  });
};

module.exports = { addSuggest, getSuggest };
