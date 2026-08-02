const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createBook, getBooks, updateBook, deleteBook, getDashboard } = require("../controllers/bookController");

router.post("/", protect, createBook);
router.get("/", protect, getBooks);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.get("/dashboard", protect, getDashboard);

module.exports = router;