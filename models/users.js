var mongoose = require ('mongoose');

var userSchema = mongoose.Schema(
    {
        Email : String,
    }
);

module.exports = mongoose.model('users', userSchema);