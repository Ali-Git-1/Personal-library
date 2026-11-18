const Book = require("../models/book");

const createBook = async (req, res) => {
  try {
    const { title, author, description, status } = req.body;

    const newBook = await Book.create({
      title,
      author,
      description,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
};
