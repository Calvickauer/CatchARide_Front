// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
require('./config/passport')(passport);
bodyParser = require('body-parser');
const multer = require('multer');
// var getRawBody = require('raw-body')
const contentType = require('content-type');

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '5mb'})); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());
app.use('/public', express.static('public'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});


var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

// Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

// API Routes
app.get('/', (req, res) => {
  res.json({ name: 'MERN Auth API', greeting: 'Welcome to the our API', author: 'YOU', message: "Smile, you are being watched by the Backend Engineering Team" });
});

app.use('/examples', require('./controllers/example'));
app.use('/users', require('./controllers/user'));
app.use('/vehicles', require('./controllers/vehicle'));
app.use('/journeys', require('./controllers/journey'));
app.use('/messages', require('./controllers/message'));
app.use('/reply', require('./controllers/reply'));
app.use('/reviews', require('./controllers/reviews'));
app.use('/images', require('./controllers/images'));


// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;
