const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// What is mongoose?
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It manages relationships between data, provides schema validation,
// and is used to translate between objects in code and the representation of those objects in MongoDB.

// IN order to set up a connection to our mongoDB app you need to use connection string or path.
// We get the path from mongoDB Atlas app in connect section.
// We put it in a config folder for security reason!
//So we should not store our keys and variables in the source code.
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
