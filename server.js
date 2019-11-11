const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./db/db.connection');

console.log(`Node environment: ${process.env.NODE_ENVY}`); // undefined
// When we want to know in what environment our application is running, and we can also
// set our environment in CLI like so:
console.log(`app: ${app.get('env')}`); // development
console.log(`Your port is ${process.env.PORT}`); // undefined
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

app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${port}`);
});
