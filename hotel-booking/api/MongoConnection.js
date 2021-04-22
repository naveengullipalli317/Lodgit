const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;

// Connect to our mongo database;
mongoose.connect("mongodb+srv://adilsikandar:adil1234@cluster0.c77nh.mongodb.net/fiver-testing-adil", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  throw err;
});