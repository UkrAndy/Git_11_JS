const crypto = require('crypto');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    email: String,
    hash: String,
    salt: String,
});

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

const User = mongoose.model("User", UsersSchema);
module.exports=User;