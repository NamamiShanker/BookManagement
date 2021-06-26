const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         emal:
 *           type: string
 *           description: The user's email. Must be unique
 *       example:
 *         name: Namami Shanker
 *         email: namami2011@gmail.com
 */
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	}
})

var User = mongoose.model('User', UserSchema);
module.exports = User;