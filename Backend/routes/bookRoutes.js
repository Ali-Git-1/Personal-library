const express = require("express");
const router = express.Router();

const { createBook, getBooks, updateBook } = require("../controllers/bookController");

router.post("/", createBook);
router.get("/", getBooks);
router.put("/:id", updateBook);

module.exports = router;
