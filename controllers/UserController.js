const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role, contactInformation } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role : role,
      contactInformation: contactInformation,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// hospital user
exports.registerHospitalUser = async (req, res) => {
  try {
    const { username, email, password, contactInformation, userId } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role : 'hospital_sub',
      addedByHospitalID: userId,
      contactInformation: contactInformation,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get the total number of users
exports.getTotalUsers = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
  
      res.status(200).json({ totalUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// login
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create and send a JWT token along with the userId
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Adjust the expiration time as needed
      });
  
      res.status(200).json({ userId: user._id, role: user.role, token }); // Include userId and role in the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Get the total number of hospital users
exports.getTotalHospitalUsers = async (req, res) => {
  try {
    const totalHospitalUsers = await User.countDocuments({ role: 'hospital' });
    res.status(200).json({ totalHospitalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get the total number of subscribers
exports.getTotalSubscribers = async (req, res) => {
  try {
    const totalSubscribers = await User.countDocuments({ role: 'subscriber' });
    res.status(200).json({ totalSubscribers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
