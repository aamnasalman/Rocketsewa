const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const database = require('./database')

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Define routes
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contentRoutes = require('./routes/contentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const quickContactRoutes = require('./routes/quickContactRoutes')


app.use('/users', userRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/content', contentRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/reviews', reviewRoutes);
app.use('/quickContacts', quickContactRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Rocketsewa Platform API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
