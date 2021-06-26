const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authors
 *         - isbn
 *       properties:
 *         title:
 *           type: string
 *           description: The book's title
 *         authors:
 *           type: string
 *           description: The authors of the book
 *         isbn:
 *           type: integer
 *           description: ISBN number of the book
 *       example:
 *         title: The Jungle Book
 *         authors: Rudyard Kipling
 *         isbn: 9780425127629
 */
var BookSchema = new Schema({
	title:{
		type: String,
		required: true,
		unique: true
	},
	authors:{
		type: String,
		required: true,
	},
	isbn:{
		type: Number,
	}
})

var Book = mongoose.model('Book', BookSchema);
module.exports = Book;
