const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    enum: ['subscriber', 'hospital', 'admin', 'hospital_sub'],
    default: 'subscriber',
  },
  profilePicture: {
    type: String, // Store the URL to the user's profile picture
  },
  contactInformation: {
    type: String, // You can store contact information here
  },
  addedByHospitalID: {
    type: Schema.Types.ObjectId, // Reference to the User ID of the hospital that added this user
    ref: 'User', // Reference the 'User' model
  },
  preferences: {
    type: Schema.Types.Mixed, // Store user preferences as a flexible object
  },
  // Add other user-related fields as needed
});

module.exports = mongoose.model('User', userSchema);
