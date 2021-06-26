var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const User = require('../models/User')

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: User login and registration API
  */


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Returns JWT Token of the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT of the parsed user. To be used as Authenticatio bearer of requests.
 *       500:
 *         description: Some server error
 */

router.post('/login', function(req, res, next) {
	var { name, email } = req.body;
	User.findOne({ email: email}).then((user)=>{
		if(user){
			res.statusCode=201;
			res.setHeader('Content-Type', 'application/json');
			jwt.sign({user:user},process.env.JWT_SECRET_KEY, (err, token)=>{
				res.json({token});
			})
		}
		else{
			res.statusCode=403;
			res.setHeader('Content-Type', 'application/json');
			res.json({
				"success": false,
				"message": "User not found"
			})
		}
	})
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registers the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post('/register', function(req, res, next) {
	var { name, email } = req.body;
	User.findOne({ email: email }).then(user=>{
		if(user){
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json')
			res.json({
				"success": false,
				"msg": "User already exists"});
		}
		else{
			var newUser = new User({
				name: name,
				email: email
			})
			newUser.save().then(user=>{
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json')
				res.json({
					"success": true,
					"msg": "New user created. Login to get JWT",
					"user": user
				})
			})
		}
	})
});

module.exports = router;
