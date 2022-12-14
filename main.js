const express = require("express");
const router = express.Router();
const path = require("path");
const controller = require( "./controllers/bookcontroller");
// GET / - return the index.html file
router.get("/" , controller.home);
router.get("/index" , controller.home);
router.get("/home" , controller.home);
router.get("/booksList" , controller.books);
router.get("/books" , controller.books);
router.get("/books/:id" , controller.books);
router.get("/search_books" , controller.search_books);
router.use("/book" ,controller.book  );
router.get("/insert" , controller.insert);
// export
module.exports = router;
