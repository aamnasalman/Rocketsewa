const mongoose = require('mongoose');
const dotenv = require('dotenv'); // For managing environment variables
dotenv.config(); // Load environment variables from a .env file if available

// Retrieve the MongoDB connection URL from environment variables
const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rocketsewa';

// Connect to MongoDB
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("running database");

// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});