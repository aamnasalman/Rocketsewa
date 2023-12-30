const QuickContact = require('../models/QuickContact');

// Create a new Quick Contact entry
exports.createQuickContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    const newQuickContact = new QuickContact({
      name,
      email,
      phoneNumber,
      message,
    });

    await newQuickContact.save();

    res.status(201).json({ message: 'Quick Contact entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all Quick Contact entries, sorted by the latest first
exports.getAllQuickContacts = async (req, res) => {
  try {
    // Retrieve all Quick Contact entries and sort them by createdAt in descending order (latest first)
    const quickContacts = await QuickContact.find().sort({ createdAt: -1 });

    res.status(200).json(quickContacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
