const mongoose = require('mongoose');

// Schema is specific to mongoose and it is not a part of mongodb.
// We use it to define the shape of documents within a collection in MongoDB
// Collection in mongoDb is like a table in relational database.
// Each collection in mongodb has documents, and documents are kind of similar to row in relational databases.
// userSchema defines the shape of user document in mongodb database.
// new mongoose.Schema() is an instance of the class Schema.
// we pass it an object, and we specify the key value pairs in our user document.
//
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', userSchema);
