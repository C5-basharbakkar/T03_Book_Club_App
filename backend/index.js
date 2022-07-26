const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers

const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permissions");
const BooksRouter = require("./routes/book");
const loginRouter = require("./routes/room");
const registerRouter = require("./routes/register");
const roomRouter = require("./routes/room");
const commentsRouter = require("./routes/comments");
const suggestRouter = require("./routes/suggest");
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);
app.use("/permission", permissionRouter);
app.use("/books", BooksRouter);
app.use("/comment", commentsRouter);
app.use("/room", roomRouter);
app.use("/suggest", suggestRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
