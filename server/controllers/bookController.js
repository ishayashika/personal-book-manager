const Book = require("../models/Book");

const createBook = async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Title and Author are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      tags,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getBooks = async (req, res) => {
  try {

    const { status, tag } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = tag;
    }

    const books = await Book.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check ownership
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this book",
      });
    }
    console.log("Request Body:", req.body);

    // Update book
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    console.log("Updated Book:", updatedBook);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find book
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check ownership
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });
    }

    // Delete book
    await Book.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDashboard = async (req, res) => {
  try {

    const totalBooks = await Book.countDocuments({
      user: req.user._id,
    });

    const wantToRead = await Book.countDocuments({
      user: req.user._id,
      status: "Want to Read",
    });

    const reading = await Book.countDocuments({
      user: req.user._id,
      status: "Reading",
    });

    const completed = await Book.countDocuments({
      user: req.user._id,
      status: "Completed",
    });

    const recentBooks = await Book.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalBooks,
        wantToRead,
        reading,
        completed,
      },
      recentBooks,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
  getDashboard,
};