const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * https://www.npmjs.com/package/passport-local-mongoose
 * Passport-Local Mongoose (ie "UserSchmema.plugin(passportLocalMongoose);"
 * will add a username, hash and salt field to store the username, the hashed password and the salt value.
 * 
 * Only the added model fields need to be defined in the model definition.
 * Here, we're adding "email"
 * 
 * Additionally Passport-Local Mongoose adds some methods to your Schema.
 */

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	}
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
