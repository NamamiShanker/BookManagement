var express = require('express');
var router = express.Router();
var verifyUser = require('../services/auth')

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: CRUD API on book collection. Authorization header required.
  */
const Book = require('../models/Book');


/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Retrieve a list of books.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', verifyUser, (req, res)=>{
	if(req.user){
		Book.find({}).then(books =>{
			res.statusCode = 200;
			res.json(books);
		});
	}
})

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get('/:id', verifyUser, (req, res)=>{
	console.log('Here');
	if(req.user){
		Book.findById(req.params.id).then(books =>{
			res.statusCode = 200;
			res.json(books);
		});
	}
})

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post('/', verifyUser, (req, res, next)=>{
	if(req.user){
		var { title, authors, isbn } = req.body;
		new Book({
			title: title,
			authors: authors,
			isbn: isbn
		}).save().then(book=>{
			res.statusCode = 200;
			res.json(book);
		}).catch(err=>{
			next(err);
		})
	}
})

/**
 * @swagger
 * /books/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Success of the operation
 *                msg:
 *                  type: string
 *                  description: Detailed message of operation
 *      500:
 *        description: Some error happened
 */
router.put('/:id', verifyUser, (req, res, next)=>{
	if(req.user){
		Book.updateOne({'_id': req.params.id}, req.body).then(msg=> {
			res.statusCode=200;
			res.json({
				success: true,
				msg: "Updated the book successfully"
			});
		}).catch(err=>{
			res.statusCode=500;
			res.json(err);
		})
	}
})

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
router.delete('/:id', verifyUser, (req, res, next)=>{
	if(req.user){
		Book.findByIdAndDelete(req.params.id)
			.then(book=>{
				res.statusCode=200;
				res.json(book);
			})
			.catch(err=>{
				res.statusCode=500;
				res.json(err);
			})
	}
})

module.exports = router;