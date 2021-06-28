var express = require('express');
var multer = require('multer');
var csv = require('csvtojson');

var router = express.Router();
var verifyUser = require('../services/auth');
var Book = require('../models/Book')
var upload = multer({dest: 'uploads/'})


 /**
  * @swagger
  * tags:
  *   name: Upload CSV file
  *   description:  Upload CSV file with title, authors, isbn fields. Authorization header required.
  */

/**
 * @swagger
 * /upload:
 *   post:
 *     tags: [Upload CSV file]
 *     summary: Upload CSV file with title, authors, isbn fields. Fields will be the same as Book API. View test.csv in git repo for example. Authorization header required.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

// Parse csv file with 'title', 'authors', and 'isbn' fields. Create Book objects and inserts them into MongoDB database.
// View 'test.csv` in root folder to understand
router.post('/', verifyUser, upload.single('csvfile'), (req, res) => {
	if(req.user){
		if(req.file){
			csv().fromFile(req.file.path).then(jsonObj=>{
				Book.insertMany(jsonObj).then(books=>{
					res.statusCode=200;
					res.json(books);
				}).catch(error=>{
					res.statusCode=500;
					res.json({
						success: false,
						error: error
					})
				});
			}).cath(error=>{
				res.statusCode=400;
				res.json({
					success: false,
					error: error
				})
			})
		}
		else{
			res.statusCode=400;
			res.json({
				success: false,
				msg: "Attach a file to the request"
			})
		}
	}
})

module.exports = router;
