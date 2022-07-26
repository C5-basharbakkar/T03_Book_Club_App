const connection = require("../models/db");

const getAllBooks = (req, res) => {
  const query = `SELECT * FROM books WHERE is_deleted=0;`;
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
      massage: "All the books",
      result: result,
    });
  });
};

const getBooksByAuthor = (req, res) => {
  const author = req.body.id;

  const query = `SELECT * FROM books WHERE author=? AND is_deleted=0;`;
  const data = [author];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `All the books for the author: ${author}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `The author: ${author} has no books`,
      });
    }
  });
};

const getBooksById = (req, res) => {
  const id = req.query.id;

  const query = `SELECT bookName,description,createDate,pagesNumber,Author,rate,category FROM books  WHERE books.id=? AND books.is_deleted=0;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      res.status(404).json({
        success: false,
        massage: "The Book is Not Found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The Book ${id}`,
      result: result,
    });
  });
};

const createNewBook = (req, res) => {
  const {
    bookName,
    description,
    createDate,
    pagesNumber,
    Author,
    rate,
    category,
  } = req.body;

  const query = `INSERT INTO books (bookName,description,createDate,pagesNumber,Author,rate,category) VALUES (?,?,?,?,?,?,?);`;

  const data = [
    bookName,
    description,
    createDate,
    pagesNumber,
    Author,
    rate,
    category,
  ];

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
      massage: "Book created",
      result: result,
    });
  });
};

const updateBookById = (req, res) => {
  const { bookName, description,createDate,pagesNumber,Author,rate,category } = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM books WHERE id=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (!result) {
      res.status(404).json({
        success: false,
        massage: `The Book: ${id} is not found`,
        err: err,
      });
    } // result are the data returned by mysql server
    else {
      const query = `UPDATE Books SET bookName=?,description=?,createDate=?,pagesNumber=?,Author=?,rate=?,category=? WHERE id=?;`;
      const data = [
        bookName || result[0].bookName,
        description || result[0].description,
        createDate || result[0].createDate,
        pagesNumber || result[0].pagesNumber,
        Author || result[0].Author,
        rate || result[0].rate,
        category || result[0].category,
        id,
      ];

      connection.query(query, data, (err, result) => {
        if (result.affectedRows != 0)
          res.status(201).json({
            success: true,
            massage: `Book updated`,
            result: result,
          });
      });
    }
  });
};

const deleteBookById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE books SET is_deleted=1 WHERE id=?;`;

  const data = [id];

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
        massage: `The Book: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete Book with id: ${id}`,
      result: result,
    });
  });
};



const viewReading = (req, res) => {
  const book_id = req.params.id;
  const query = `SELECT * FROM viewReading inner join users on viewReading.user_id = users.id where viewReading.book_id=?`;
  const data = [book_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server Error",
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: `All user that reading Book with id:${book_id} `,
      result,
    });
  });
};

const viewList = (req, res) => {
  const user_id = req.token.user_id;
  const { book_id, list_id } = req.params;
  const query = `SELECT * FROM viewReading INNER JOIN books on viewReading.book_id =books.id INNER JOIN readingList on viewReading.readingList_id = readingList.id where user_id=? AND id_deleted=0 `;
  const data = [user_id, book_id, list_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server Error",
        err,
      });
    }
    res.status(201).json({
      success:true,
      message:"All Books "
    })
  });
};

const addList=(req,res)=>{
  const {book_id,List_id}=req.params
  const user_id=req.token.user_id
  const query=`INSRT INTO viewReading (book_id,List_id,user_id) VALUES (?,?,?) INNER JOIN readingList ON viewReading.readingList_id = readingList.id where user_id=?`
  const data=[book_id,list_id,user_id]
  connection.query(query,data,((err,result)=>{
    if(err){
      res.status(500).json({
        success: false,
        message: "server Error",
        err,
      });
    }
    res.status(201).json({
      success:true,
      message:"the book added to the list",
      result
    })
  }))
}


const deleteFromList=(req,res)=>{
  const {book_id,List_id}=req.params
  const user_id=req.token.user_id
const query=`UPDATE viewReading set is_deleted=1 where book_id=? and List_id=? `
const data=[book_id,user_id,List_id]
connection.query(query,data,((err,result)=>{
  if(err){
    res.status(500).json({
      success: false,
      message: "server Error",
      err,
    });
  }
  res.status(201).json({
    success:true,
    message:"the book is deleted",
    result
  })
}))
}

module.exports = {
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
};
