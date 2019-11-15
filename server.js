const express = require('express');
const app = express();

const connectDB = require('./db/db.connection');
const path = require('path');
// Connect DB
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// When you use app.use('/some_route', myCallBack())
// Express will listen for requests for that route,
// and when it’s hit, it will call the function you provided.

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in the production.
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${PORT}`);
});
